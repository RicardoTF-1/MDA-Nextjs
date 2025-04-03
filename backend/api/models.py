# backend/api/models.py

from django.db import models
from django.contrib.auth.models import User
import requests
from django.conf import settings

# backend/api/models.py (update your existing Location model)

class Location(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20)
    phone = models.CharField(max_length=20)
    email = models.EmailField(blank=True, null=True)
    # Add these new fields
    image = models.ImageField(upload_to='locations/', blank=True, null=True)
    is_active = models.BooleanField(default=True)
    #Thi is for the google maps component
    order = models.PositiveSmallIntegerField(default=0)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    # backend/api/models.py - add this to your Location model

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
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True, null=True)
    
    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name_plural = "Course Categories"

class Course(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='courses')
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    discounted_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    duration = models.CharField(max_length=100)  # e.g., "8 weeks", "3 months"
    is_featured = models.BooleanField(default=False)
    image = models.ImageField(upload_to='courses/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title



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

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    featured_image = models.ImageField(upload_to='blog/', blank=True, null=True)
    is_published = models.BooleanField(default=False)
    published_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title

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
