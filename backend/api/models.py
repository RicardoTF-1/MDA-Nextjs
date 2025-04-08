# backend/api/models.py

from django.db import models
from django.contrib.auth.models import User
import requests
from django.conf import settings
from django.utils.text import slugify
# backend/api/models.py (update your existing Location model)

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    image = models.ImageField(upload_to='locations/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveSmallIntegerField(default=0)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    
    def geocode_address(self):
        """Geocode the address to get latitude and longitude"""
        if not self.latitude or not self.longitude:
            try:
                address = f"{self.address}, {self.city}, {self.state} {self.zip_code}"
                params = {
                    'address': address,
                    'key': settings.GOOGLE_MAPS_API_KEY
                }
                response = requests.get('https://maps.googleapis.com/maps/api/geocode/json', params=params)
                data = response.json()
                
                if data['status'] == 'OK':
                    location = data['results'][0]['geometry']['location']
                    self.latitude = location['lat']
                    self.longitude = location['lng']
            except Exception as e:
                print(f"Geocoding error: {e}")

    def save(self, *args, **kwargs):
        self.geocode_address()
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.name} - {self.city}, {self.state}"
    
    class Meta:
        ordering = ['order', 'name']
# Modelo para el componente de poner horarios en el homepage

class ClassSchedule(models.Model):
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='schedules')
    date = models.DateField()
    time = models.TimeField()
    registration_link = models.CharField(max_length=255, default="/contacto")
    is_full = models.BooleanField(default=False)
    
    def __str__(self):
        formatted_date = self.date.strftime("%d de %B").lower()
        formatted_time = self.time.strftime("%H:%M")
        return f"{self.location.name} - {formatted_date}, {formatted_time}"

    class Meta:
        ordering = ['date', 'time']

class CourseCategory(models.Model):
    """Main course categories like 'In Car Services', 'Teen Programs', etc."""
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    icon_svg = models.TextField(help_text="SVG code for the icon", null=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Course Categories"
        ordering = ['order', 'name']

class CourseSubcategory(models.Model):
    """Optional subcategories for courses like 'Road Test Prep', 'Behind the Wheel' for 'In Car Services'"""
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='subcategories')
    name = models.CharField(max_length=100)
    slug = models.SlugField()
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(upload_to='subcategories/', blank=True, null=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    is_highlighted = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.category.name} - {self.name}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    class Meta:
        verbose_name_plural = "Course Subcategories"
        ordering = ['category', 'order', 'name']
        unique_together = ['category', 'slug']

class Course(models.Model):
    """Individual course offerings like '2 Hours Behind-the-wheel + Road Test'"""
    HEADER_COLOR_CHOICES = [
        ('dark', 'Dark (Default)'),
        ('warning', 'Warning (Gold/Featured)'),
        ('primary', 'Primary (Blue)'),
        ('success', 'Success (Green)'),
        ('danger', 'Danger (Red)'),
        ('info', 'Info (Light Blue)'),
    ]
    
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='direct_courses')
    subcategory = models.ForeignKey(CourseSubcategory, on_delete=models.SET_NULL, 
                                   related_name='courses', null=True, blank=True)
    title = models.CharField(max_length=200)
    slug = models.SlugField()
    subtitle = models.CharField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    bullet_points = models.TextField(help_text="One bullet point per line", null=True)
    header_color = models.CharField(max_length=20, choices=HEADER_COLOR_CHOICES, default='dark')
    is_featured = models.BooleanField(default=False)
    has_free_pickup = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    
    def __str__(self):
        if self.subcategory:
            return f"{self.subcategory.name} - {self.title}"
        return f"{self.category.name} - {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['category', 'subcategory', 'order', 'title']
        unique_together = [['category', 'slug'], ['subcategory', 'slug']]



class Testimonial(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100, blank=True)  # e.g., "Student", "Parent"
    content = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)  # 1-5 star rating
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.rating} stars"

class FAQ(models.Model):
    question = models.CharField(max_length=255)
    answer = models.TextField()
    category = models.CharField(max_length=100, default="General")
    order = models.PositiveSmallIntegerField(default=0)
    
    def __str__(self):
        return self.question
    
    class Meta:
        ordering = ['order', 'category']
        verbose_name = "FAQ"
        verbose_name_plural = "FAQs"

# backend/api/models.py

# Add these models to your existing models.py file
class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['order', 'name']
        verbose_name_plural = "Blog Categories"

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(BlogCategory, on_delete=models.CASCADE, related_name='posts', null=True)
    excerpt = models.TextField(blank=True, null=True, help_text="A short summary of the post (optional)")
    content = models.TextField()
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    is_published = models.BooleanField(default=False)
    published_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured = models.BooleanField(default=False, help_text="Feature this post on the homepage")
    meta_description = models.CharField(max_length=160, blank=True, null=True, help_text="Meta description for SEO (optional)")
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if self.is_published and not self.published_date:
            self.published_date = timezone.now()
        super().save(*args, **kwargs)
    
    class Meta:
        ordering = ['-published_date', '-created_at']

class ContactForm(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_processed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
    
class Banner(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='banners/')
    button_text = models.CharField(max_length=100)
    button_link = models.CharField(max_length=200)
    button_color = models.CharField(max_length=50, default='bg-green-500 hover:bg-green-600', 
                                   help_text="Tailwind CSS classes for button color")
    order = models.PositiveSmallIntegerField(default=0, help_text="Display order of the banner")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order', '-created_at']
        
class ServiceCategory(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=100, blank=True, null=True)
    icon_svg = models.TextField(help_text="SVG code for the icon")
    link = models.CharField(max_length=200)
    order = models.PositiveSmallIntegerField(default=0, help_text="Display order of the category")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order', 'title']
        verbose_name_plural = "Service Categories"
        

# For locations used in dropdown menus
class CourseLocation(models.Model):
    """Mapping of courses to locations where they are offered"""
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='locations', null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='courses')
    is_available = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.course.title} at {self.location.name}"
    
    class Meta:
        unique_together = ['course', 'location']

# backend/api/models.py (add this to your existing models)

class SliderImage(models.Model):
    title = models.CharField(max_length=100)
    subtitle = models.CharField(max_length=200, blank=True)
    image = models.ImageField(upload_to='slider/')
    button_text = models.CharField(max_length=50, blank=True)
    button_link = models.CharField(max_length=200, blank=True)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['order']
        
# Add this to your existing models.py file

class SiteSettings(models.Model):
    site_name = models.CharField(max_length=100, default="My Drive Academy")
    logo = models.ImageField(upload_to='site/', help_text="Site logo (light version for dark backgrounds)")
    logo_dark = models.ImageField(upload_to='site/', help_text="Site logo (dark version for light backgrounds)", blank=True, null=True)
    favicon = models.ImageField(upload_to='site/', blank=True, null=True)
    primary_color = models.CharField(max_length=20, default="#4ade80", help_text="Primary color in hex format (e.g. #4ade80)")
    secondary_color = models.CharField(max_length=20, default="#60a5fa", help_text="Secondary color in hex format (e.g. #60a5fa)")
    footer_text = models.TextField(blank=True, null=True)
    copyright_text = models.CharField(max_length=255, default="© {year} My Drive Academy. All rights reserved.")
    is_active = models.BooleanField(default=True)
    
    class Meta:
        verbose_name = "Site Settings"
        verbose_name_plural = "Site Settings"
    
    def __str__(self):
        return "Site Settings"
    
    def save(self, *args, **kwargs):
        # Ensure only one instance exists
        if SiteSettings.objects.exists() and not self.pk:
            raise ValidationError("Only one site settings instance can exist")
        super().save(*args, **kwargs)

# Course Finder models

class CourseFinderQuestion(models.Model):
    QUESTION_TYPES = (
        ('age_group', 'Age Group'),
        ('location', 'Location'),
        ('experience', 'Driving Experience'),
        ('custom', 'Custom Question'),
    )
    
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES)
    question_text = models.CharField(max_length=255)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.get_question_type_display()}: {self.question_text}"
    
    class Meta:
        ordering = ['order']

class CourseFinderOption(models.Model):
    question = models.ForeignKey(CourseFinderQuestion, on_delete=models.CASCADE, related_name='options')
    option_text = models.CharField(max_length=255)
    order = models.PositiveSmallIntegerField(default=0)
    
    # For location questions, we can link directly to Location model
    location = models.ForeignKey('Location', on_delete=models.SET_NULL, null=True, blank=True, 
                                related_name='finder_options')
    
    def __str__(self):
        return self.option_text
    
    class Meta:
        ordering = ['order']

class CourseRecommendationRule(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    
    # Key criteria
    age_groups = models.ManyToManyField(CourseFinderOption, blank=True, related_name='age_rules',
                                       limit_choices_to={'question__question_type': 'age_group'})
    locations = models.ManyToManyField('Location', blank=True, related_name='location_rules')
    experience_levels = models.ManyToManyField(CourseFinderOption, blank=True, related_name='experience_rules',
                                              limit_choices_to={'question__question_type': 'experience'})
    
    # Recommended course - use the existing Course model
    recommended_course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='recommendation_rules')
    
    # Priority if multiple rules match (higher number = higher priority)
    priority = models.PositiveSmallIntegerField(default=0)
    
    def __str__(self):
        return self.name
    
    class Meta:
        ordering = ['-priority']
        
    def get_recommended_course(self):
        """Retrieve the recommended course with all its details."""
        return self.recommended_course