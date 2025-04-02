# backend/api/views.py

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Location, CourseCategory, Course, ClassSchedule, Testimonial, FAQ, BlogPost, ContactForm, SliderImage
from .serializers import (
    LocationSerializer, CourseCategorySerializer, CourseSerializer, ClassScheduleSerializer,
    TestimonialSerializer, FAQSerializer, BlogPostSerializer, ContactFormSerializer, SliderImageSerializer, LocationSerializer
)

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]

class CourseCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseCategory.objects.all()
    serializer_class = CourseCategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_queryset(self):
        queryset = Course.objects.all()
        category_slug = self.request.query_params.get('category', None)
        
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
            
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_courses = Course.objects.filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured_courses, many=True)
        return Response(serializer.data)

class ClassScheduleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ClassSchedule.objects.all()
    serializer_class = ClassScheduleSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = ClassSchedule.objects.all()
        location_id = self.request.query_params.get('location', None)
        course_id = self.request.query_params.get('course', None)
        
        if location_id:
            queryset = queryset.filter(location_id=location_id)
        
        if course_id:
            queryset = queryset.filter(course_id=course_id)
            
        return queryset

class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_testimonials = Testimonial.objects.filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured_testimonials, many=True)
        return Response(serializer.data)

class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        queryset = FAQ.objects.all()
        category = self.request.query_params.get('category', None)
        
        if category:
            queryset = queryset.filter(category=category)
            
        return queryset

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True)
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class ContactFormViewSet(viewsets.GenericViewSet):
    serializer_class = ContactFormSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Thank you for your message. We will contact you soon.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# api/views.py
class SliderImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SliderImage.objects.filter(is_active=True)
    serializer_class = SliderImageSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context


