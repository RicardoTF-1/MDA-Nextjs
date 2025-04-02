# backend/api/serializers.py

from rest_framework import serializers
from .models import Location, CourseCategory, Course, ClassSchedule, Testimonial, FAQ, BlogPost, ContactForm, SliderImage

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = '__all__'

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

