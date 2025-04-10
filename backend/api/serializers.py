# backend/api/serializers.py

from rest_framework import serializers
from .models import (Location, CourseCategory, Course, ClassSchedule,
        Testimonial, FAQ, BlogPost, ContactForm, Banner, ServiceCategory, SliderImage, BlogCategory,
        SiteSettings, CourseFinderQuestion, CourseFinderOption, CourseRecommendationRule, 
        CourseLocation, CourseSubcategory)

# backend/api/serializers.py
class LocationSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Location
        fields = ['id', 'name', 'address', 'city', 'state', 'zip_code', 
                  'phone', 'email', 'image', 'image_url', 'is_active', 'order']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"http://localhost:8000{obj.image.url}"
        return None

class CourseCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    
    class Meta:
        model = Course
        fields = '__all__'

# Serializer para ClassSchedule
class ClassScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClassSchedule
        fields = ['id', 'date', 'time', 'is_full', 'spots_left']
        
# Serializer para CourseLocation que incluya datos del horario
class CourseLocationWithScheduleSerializer(serializers.ModelSerializer):
    course_title = serializers.ReadOnlyField(source='course.title')
    location_name = serializers.ReadOnlyField(source='location.name')
    schedule_date = serializers.SerializerMethodField()
    schedule_time = serializers.SerializerMethodField()
    schedule_is_full = serializers.SerializerMethodField()
    schedule_spots_left = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseLocation
        fields = ['id', 'course_title', 'location_name', 'schedule_date', 'schedule_time', 
                  'schedule_is_full', 'schedule_spots_left', 'is_available', 'price',
                  'registration_link']
    
    def get_schedule_date(self, obj):
        if obj.schedule:
            return obj.schedule.date
        return None
    
    def get_schedule_time(self, obj):
        if obj.schedule:
            return obj.schedule.time
        return None
    
    def get_schedule_is_full(self, obj):
        if obj.schedule:
            return obj.schedule.is_full
        return False
    
    def get_schedule_spots_left(self, obj):
        if obj.schedule:
            return obj.schedule.spots_left
        return 0

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

class BlogCategorySerializer(serializers.ModelSerializer):
    post_count = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogCategory
        fields = ['id', 'name', 'slug', 'description', 'post_count']
    
    def get_post_count(self, obj):
        return obj.posts.filter(is_published=True).count()

class BlogPostListSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField(source='category.name')
    category_slug = serializers.ReadOnlyField(source='category.slug')
    author_name = serializers.SerializerMethodField()
    featured_image_url = serializers.SerializerMethodField()
    reading_time = serializers.SerializerMethodField()
    
    class Meta:
        model = BlogPost
        fields = [
            'id', 'title', 'slug', 'excerpt', 'featured_image', 'featured_image_url', 
            'author', 'author_name', 'published_date', 'category', 'category_name', 
            'category_slug', 'is_featured', 'reading_time'
        ]
    
    def get_author_name(self, obj):
        return obj.author.get_full_name() or obj.author.username
    
    def get_featured_image_url(self, obj):
        request = self.context.get('request')
        if obj.featured_image and hasattr(obj.featured_image, 'url') and request is not None:
            return request.build_absolute_uri(obj.featured_image.url)
        return None
    
    def get_reading_time(self, obj):
        # Calculate approximate reading time (assuming 200 words per minute)
        word_count = len(obj.content.split())
        minutes = max(1, round(word_count / 200))
        return minutes

class BlogPostDetailSerializer(BlogPostListSerializer):
    content = serializers.CharField()
    related_posts = serializers.SerializerMethodField()
    
    class Meta(BlogPostListSerializer.Meta):
        fields = BlogPostListSerializer.Meta.fields + ['content', 'meta_description', 'related_posts']
    
    def get_related_posts(self, obj):
        # Get 3 related posts from the same category, excluding the current post
        related = BlogPost.objects.filter(
            category=obj.category, 
            is_published=True
        ).exclude(id=obj.id).order_by('-published_date')[:3]
        
        return BlogPostListSerializer(
            related, 
            many=True, 
            context=self.context
        ).data

class ContactFormSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactForm
        fields = ('name', 'email', 'phone', 'subject', 'message')
        
class BannerSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Banner
        fields = ['id', 'title', 'description', 'image', 'image_url', 'button_text', 
                  'button_link', 'button_color', 'order']
    
    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and hasattr(obj.image, 'url') and request is not None:
            return request.build_absolute_uri(obj.image.url)
        return None
    
class ServiceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCategory
        fields = ['id', 'title', 'subtitle', 'icon_svg', 'link', 'order']
        
class CourseLocationSerializer(serializers.ModelSerializer):
    location_details = serializers.SerializerMethodField()
    actual_price = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseLocation
        fields = ['id', 'location', 'location_details', 'is_available', 
                  'price', 'discounted_price', 'has_free_pickup', 
                  'instructor_note', 'availability_note', 'actual_price']
    
    def get_location_details(self, obj):
        # Use the LocationSerializer to get full location details
        return LocationSerializer(obj.location, context=self.context).data
    
    def get_actual_price(self, obj):
        # Return the effective price (location-specific or course default)
        return obj.get_price()
        
class CourseListSerializer(serializers.ModelSerializer):
    bullet_point_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'title', 'slug', 'subtitle', 'description', 
                  'bullet_point_list', 'header_color', 'is_featured', 
                  'has_free_pickup', 'price', 'duration', 'age_range']
    
    def get_bullet_point_list(self, obj):
        if obj.bullet_points:
            return [point.strip() for point in obj.bullet_points.split('\n') if point.strip()]
        return []

class CourseDetailSerializer(CourseListSerializer):
    locations = CourseLocationSerializer(many=True, read_only=True)
    category_name = serializers.ReadOnlyField(source='category.name')
    subcategory_name = serializers.ReadOnlyField(source='subcategory.name')
    
    class Meta:
        model = Course
        fields = CourseListSerializer.Meta.fields + [
            'locations', 'category_name', 'subcategory_name'
        ]
class CourseSubcategorySerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    courses = CourseListSerializer(many=True, read_only=True)
    
    class Meta:
        model = CourseSubcategory
        fields = ['id', 'name', 'slug', 'description', 'image', 'image_url', 
                 'order', 'is_active', 'is_highlighted', 'courses']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

class CourseCategoryListSerializer(serializers.ModelSerializer):
    icon_html = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseCategory
        fields = ['id', 'name', 'slug', 'description', 'icon_svg', 'icon_html', 'order']
    
    def get_icon_html(self, obj):
        return obj.icon_svg

class CourseCategoryDetailSerializer(serializers.ModelSerializer):
    subcategories = CourseSubcategorySerializer(many=True, read_only=True)
    direct_courses = CourseListSerializer(many=True, read_only=True)
    has_subcategories = serializers.SerializerMethodField()
    
    class Meta:
        model = CourseCategory
        fields = ['id', 'name', 'slug', 'description', 'icon_svg', 
                 'subcategories', 'direct_courses', 'has_subcategories']
    
    def get_has_subcategories(self, obj):
        return obj.subcategories.filter(is_active=True).exists()

# api/serializers.py
class SliderImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = SliderImage
        fields = ['id', 'title', 'subtitle', 'image', 'image_url', 'button_text', 'button_link', 'order', 'is_active']
    
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None


# Add this to your existing LocationSerializer or create a new one
class LocationWithSchedulesSerializer(serializers.ModelSerializer):
    schedules = ClassScheduleSerializer(many=True, read_only=True)
    image_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Location
        fields = ['id', 'name', 'city', 'state', 'image', 'image_url', 'schedules']
        
    def get_image_url(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return f"http://localhost:8000{obj.image.url}"
        return None

class SiteSettingsSerializer(serializers.ModelSerializer):
    logo_url = serializers.SerializerMethodField()
    logo_dark_url = serializers.SerializerMethodField()
    favicon_url = serializers.SerializerMethodField()
    
    class Meta:
        model = SiteSettings
        fields = ['site_name', 'logo', 'logo_url', 'logo_dark', 'logo_dark_url', 
                  'favicon', 'favicon_url', 'primary_color', 'secondary_color', 
                  'footer_text', 'copyright_text']
    
    def get_logo_url(self, obj):
        if obj.logo:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo.url)
            return obj.logo.url
        return None
    
    def get_logo_dark_url(self, obj):
        if obj.logo_dark:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.logo_dark.url)
            return obj.logo_dark.url
        return None
    
    def get_favicon_url(self, obj):
        if obj.favicon:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.favicon.url)
            return obj.favicon.url
        return None
    
class LocationLightSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'city', 'state']

class CourseFinderOptionSerializer(serializers.ModelSerializer):
    location_details = LocationLightSerializer(source='location', read_only=True)
    
    class Meta:
        model = CourseFinderOption
        fields = ['id', 'option_text', 'order', 'location', 'location_details']

class CourseFinderQuestionSerializer(serializers.ModelSerializer):
    options = CourseFinderOptionSerializer(many=True, read_only=True)
    
    class Meta:
        model = CourseFinderQuestion
        fields = ['id', 'question_type', 'question_text', 'order', 'options']

# class CourseDetailSerializer(serializers.ModelSerializer):
#     bullet_point_list = serializers.SerializerMethodField()
#     category_name = serializers.ReadOnlyField(source='category.name')
#     locations = serializers.SerializerMethodField()
#     subcategory_name = serializers.ReadOnlyField(source='subcategory.name')
    
#     class Meta:
#         model = Course
#         fields = CourseListSerializer.Meta.fields + [
#             'locations', 'category_name', 'subcategory_name',
#             'bullet_point_list'
#         ]
    
#     def get_bullet_point_list(self, obj):
#         if obj.bullet_points:
#             return [point.strip() for point in obj.bullet_points.split('\n') if point.strip()]
#         # Extract bullet points from description if not explicitly provided
#         return [point.strip() for point in obj.description.split('\n') if point.strip()]
    
#     def get_locations(self, obj):
#         return [
#             f"{location.name}, {location.city}" 
#             for location in obj.available_locations.filter(is_active=True)
#         ]

# Modify the CourseRecommendationSerializer to match updated CourseDetailSerializer
class CourseRecommendationSerializer(serializers.Serializer):
    name = serializers.CharField()
    description = serializers.CharField()
    course_details = CourseDetailSerializer()