# backend/api/serializers.py

from rest_framework import serializers
from .models import (Location, CourseCategory, Course, ClassSchedule,
        Testimonial, FAQ, BlogPost, ContactForm, Banner, ServiceCategory, SliderImage)

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

class ClassScheduleSerializer(serializers.ModelSerializer):
    course_title = serializers.ReadOnlyField(source='course.title')
    location_name = serializers.ReadOnlyField(source='location.name')
    
    class Meta:
        model = ClassSchedule
        fields = '__all__'

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = '__all__'

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = '__all__'

class BlogPostSerializer(serializers.ModelSerializer):
    author_name = serializers.ReadOnlyField(source='author.get_full_name')
    
    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ('author', 'author_name', 'created_at', 'updated_at')

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



# Modelo para los horarios y location del home componente

class ClassScheduleSerializer(serializers.ModelSerializer):
    formatted_date = serializers.SerializerMethodField()
    
    class Meta:
        model = ClassSchedule
        fields = ['id', 'date', 'time', 'formatted_date', 'registration_link', 'is_full']
        
    def get_formatted_date(self, obj):
        # Convert date to Spanish format like "24 DE MARZO"
        months = {
            1: 'ENERO', 2: 'FEBRERO', 3: 'MARZO', 4: 'ABRIL', 5: 'MAYO', 
            6: 'JUNIO', 7: 'JULIO', 8: 'AGOSTO', 9: 'SEPTIEMBRE', 
            10: 'OCTUBRE', 11: 'NOVIEMBRE', 12: 'DICIEMBRE'
        }
        return f"{obj.date.day} DE {months[obj.date.month]}, {obj.time.strftime('%H:%M')}"

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

