# backend/api/views.py
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db.models import Prefetch, Q
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import (Location, CourseCategory, Course, ClassSchedule,
    Testimonial, FAQ, BlogPost, ContactForm, Banner, ServiceCategory, SliderImage, BlogCategory,
    SiteSettings, CourseFinderQuestion, CourseFinderOption, CourseRecommendationRule,
    CourseSubcategory, CourseLocation)
from .serializers import (
    LocationSerializer, CourseCategorySerializer, CourseSerializer, ClassScheduleSerializer,
    TestimonialSerializer, FAQSerializer, ContactFormSerializer,
    BannerSerializer, ServiceCategorySerializer, LocationWithSchedulesSerializer, SliderImageSerializer,
    BlogCategorySerializer, BlogPostListSerializer, BlogPostDetailSerializer, SiteSettingsSerializer,
    CourseFinderQuestionSerializer, CourseRecommendationSerializer,
    CourseCategoryListSerializer, CourseCategoryDetailSerializer,
    CourseSubcategorySerializer, CourseListSerializer, CourseDetailSerializer,
    LocationSerializer, CourseLocationSerializer
    )


class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.filter(is_active=True).order_by('order')
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=False, methods=['get'])
    def with_schedules(self, request):
        """Get all active locations with their upcoming schedules"""
        locations = Location.objects.filter(is_active=True).prefetch_related(
            Prefetch(
                'schedules',
                queryset=ClassSchedule.objects.filter(
                    date__gte=timezone.now().date()
                ).order_by('date', 'time')
            )
        ).order_by('order', 'name')
        
        serializer = LocationWithSchedulesSerializer(locations, many=True, context={'request': request})
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def courses(self, request, pk=None):
        """Get courses available at this location"""
        location = self.get_object()
        course_locations = CourseLocation.objects.filter(
            location=location,
            is_available=True
        )
        courses = [cl.course for cl in course_locations if cl.course.is_active]
        
        serializer = CourseListSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

class CourseCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseCategory.objects.filter(is_active=True).order_by('order')
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseCategoryDetailSerializer
        return CourseCategoryListSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=True, methods=['get'])
    def subcategories(self, request, slug=None):
        """Get all subcategories for a specific category"""
        category = self.get_object()
        subcategories = CourseSubcategory.objects.filter(
            category=category,
            is_active=True
        ).order_by('order')
        
        serializer = CourseSubcategorySerializer(
            subcategories, 
            many=True, 
            context={'request': request}
        )
        
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def courses(self, request, slug=None):
        """
        Get all courses for a category.
        If subcategory slug is provided, filter by that subcategory.
        """
        category = self.get_object()
        subcategory_slug = request.query_params.get('subcategory')
        
        if subcategory_slug:
            subcategory = get_object_or_404(
                CourseSubcategory, 
                category=category,
                slug=subcategory_slug,
                is_active=True
            )
            courses = Course.objects.filter(
                subcategory=subcategory,
                is_active=True
            ).order_by('order')
        else:
            # If no subcategory, get direct courses for this category
            courses = Course.objects.filter(
                category=category,
                subcategory__isnull=True,
                is_active=True
            ).order_by('order')
        
        serializer = CourseListSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)
    
class CourseSubcategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseSubcategory.objects.filter(is_active=True).order_by('order')
    serializer_class = CourseSubcategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        return queryset
    
    @action(detail=True, methods=['get'])
    def courses(self, request, slug=None):
        """Get all courses for a specific subcategory"""
        subcategory = self.get_object()
        courses = Course.objects.filter(
            subcategory=subcategory,
            is_active=True
        ).order_by('order')
        
        serializer = CourseListSerializer(courses, many=True, context={'request': request})
        return Response(serializer.data)

class CourseViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Course.objects.filter(is_active=True).order_by('order')
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CourseDetailSerializer
        return CourseListSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_queryset(self):
        queryset = super().get_queryset()
        category_slug = self.request.query_params.get('category')
        subcategory_slug = self.request.query_params.get('subcategory')
        
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
            
        if subcategory_slug:
            queryset = queryset.filter(subcategory__slug=subcategory_slug)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_courses = self.get_queryset().filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured_courses, many=True)
        return Response(serializer.data)

class LocationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Location.objects.filter(is_active=True).order_by('order')
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    @action(detail=True, methods=['get'])
    def courses(self, request, pk=None):
        """Get courses available at this location"""
        location = self.get_object()
        course_locations = CourseLocation.objects.filter(
            location=location,
            is_available=True
        )
        courses = [cl.course for cl in course_locations if cl.course.is_active]
        
        serializer = CourseListSerializer(courses, many=True, context={'request': request})
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

class BlogCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogCategory.objects.filter(is_active=True)
    serializer_class = BlogCategorySerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'

class BlogPostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BlogPost.objects.filter(is_published=True, published_date__lte=timezone.now())
    serializer_class = BlogPostListSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return BlogPostDetailSerializer
        return BlogPostListSerializer
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_queryset(self):
        queryset = super().get_queryset().select_related('author', 'category')
        
        # Filter by category
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        
        # Search functionality
        search_query = self.request.query_params.get('search')
        if search_query:
            queryset = queryset.filter(
                models.Q(title__icontains=search_query) | 
                models.Q(excerpt__icontains=search_query) |
                models.Q(content__icontains=search_query)
            )
            
        return queryset
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured_posts = self.get_queryset().filter(is_featured=True)[:6]
        serializer = self.get_serializer(featured_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def popular(self, request):
        # For a real implementation, you might want to track page views
        # This is a placeholder that just returns recent posts
        popular_posts = self.get_queryset().order_by('-published_date')[:6]
        serializer = self.get_serializer(popular_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def recent(self, request):
        recent_posts = self.get_queryset().order_by('-published_date')[:10]
        serializer = self.get_serializer(recent_posts, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def category(self, request, category_slug=None):
        if not category_slug:
            return Response(
                {"error": "Category slug is required"}, 
                status=status.HTTP_400_BAD_REQUEST
            )
            
        try:
            category = BlogCategory.objects.get(slug=category_slug, is_active=True)
        except BlogCategory.DoesNotExist:
            return Response(
                {"error": "Category not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )
            
        posts = self.get_queryset().filter(category=category)
        serializer = self.get_serializer(posts, many=True)
        
        return Response({
            "category": BlogCategorySerializer(category).data,
            "posts": serializer.data
        })

class ContactFormViewSet(viewsets.GenericViewSet):
    serializer_class = ContactFormSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Thank you for your message. We will contact you soon.'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BannerViewSet(viewsets.ReadOnlyModelViewSet):  # Note: should be ReadOnlyModelViewSet not ReadOnlyViewSet
    queryset = Banner.objects.filter(is_active=True).order_by('order')
    serializer_class = BannerSerializer
    permission_classes = [permissions.AllowAny]  # Make sure this is set to AllowAny
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# api/views.py
class SliderImageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SliderImage.objects.filter(is_active=True)
    serializer_class = SliderImageSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class ServiceCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ServiceCategory.objects.filter(is_active=True).order_by('order')
    serializer_class = ServiceCategorySerializer
    permission_classes = [permissions.AllowAny]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context
    
    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ServiceCategoryDetailSerializer
        return ServiceCategorySerializer
    
    @action(detail=True, methods=['get'])
    def subcategories(self, request, pk=None):
        """Get all subcategories for a specific service category"""
        category = self.get_object()
        subcategories = ServiceSubcategory.objects.filter(
            category=category,
            is_active=True
        ).order_by('order')
        
        serializer = ServiceSubcategorySerializer(
            subcategories, 
            many=True, 
            context={'request': request}
        )
        
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def car_lessons(self, request):
        """Specific endpoint for in-car lessons subcategories"""
        try:
            category = ServiceCategory.objects.get(
                title__icontains='car', 
                is_active=True
            )
            subcategories = ServiceSubcategory.objects.filter(
                category=category,
                is_active=True
            ).order_by('order')
            
            serializer = ServiceSubcategorySerializer(
                subcategories, 
                many=True, 
                context={'request': request}
            )
            
            return Response({
                'category': ServiceCategorySerializer(category, context={'request': request}).data,
                'subcategories': serializer.data
            })
        except ServiceCategory.DoesNotExist:
            return Response({'error': 'In-car lessons category not found'}, status=404)
        
class SiteSettingsView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def get(self, request):
        try:
            settings = SiteSettings.objects.get(is_active=True)
        except SiteSettings.DoesNotExist:
            # Create default settings if none exist
            settings = SiteSettings.objects.create(
                site_name="My Drive Academy",
                is_active=True
            )
        
        serializer = SiteSettingsSerializer(settings, context={'request': request})
        return Response(serializer.data)

class CourseFinderViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CourseFinderQuestion.objects.filter(is_active=True).order_by('order')
    serializer_class = CourseFinderQuestionSerializer
    permission_classes = [permissions.AllowAny]
    
    def get_queryset(self):
        """
        Dynamically populate location options from active locations.
        """
        queryset = super().get_queryset()
        
        # For each location question, ensure options match active locations
        for question in queryset:
            if question.question_type == 'location':
                # Get current options
                current_options = set(question.options.values_list('location_id', flat=True))
                # Get active locations
                active_locations = Location.objects.filter(is_active=True)
                
                for location in active_locations:
                    # Create an option for this location if it doesn't exist
                    if location.id not in current_options:
                        CourseFinderOption.objects.create(
                            question=question,
                            option_text=f"{location.name}, {location.city}",
                            location=location,
                            order=location.order
                        )
        
        return queryset
    
    @action(detail=False, methods=['post'])
    def recommend(self, request):
        """
        Recommend courses based on user's answers to the course finder questions.
        
        Expects data in the format:
        {
            "age_group": option_id,
            "location": option_id or location_id,
            "experience": option_id
        }
        """
        try:
            age_group_id = request.data.get('age_group')
            location_param = request.data.get('location')
            experience_id = request.data.get('experience')
            
            # Find matching recommendation rules or direct course matches
            matching_courses = Course.objects.all()
            
            # Get the location
            location_id = None
            if location_param:
                try:
                    # First check if it's a location ID
                    location = Location.objects.get(id=location_param)
                    location_id = location.id
                except (ValueError, Location.DoesNotExist):
                    # Then check if it's an option ID
                    try:
                        option = CourseFinderOption.objects.get(id=location_param)
                        if option.location:
                            location_id = option.location.id
                    except CourseFinderOption.DoesNotExist:
                        pass
            
            # Get age group value
            age_range = None
            if age_group_id:
                try:
                    option = CourseFinderOption.objects.get(id=age_group_id)
                    if 'teen' in option.option_text.lower():
                        age_range = 'teen'
                    elif 'adult' in option.option_text.lower():
                        age_range = 'adult'
                    elif 'international' in option.option_text.lower():
                        age_range = 'international'
                except CourseFinderOption.DoesNotExist:
                    pass
            
            # Filter courses by age range if available
            if age_range:
                matching_courses = matching_courses.filter(
                    models.Q(age_range=age_range) | models.Q(age_range='all')
                )
            
            # Filter courses by location if available
            if location_id:
                matching_courses = matching_courses.filter(available_locations__id=location_id)
            
            # Filter courses by experience level if available
            if experience_id:
                matching_courses = matching_courses.filter(experience_level__id=experience_id)
            
            recommended_course = None
            
            # Try finding a course first
            if matching_courses.exists():
                # Prioritize featured courses
                featured_course = matching_courses.filter(is_featured=True).first()
                if featured_course:
                    recommended_course = featured_course
                else:
                    recommended_course = matching_courses.first()
            
            # If no direct course match, try recommendation rules
            if not recommended_course:
                matching_rules = CourseRecommendationRule.objects.filter(is_active=True)
                
                if age_group_id:
                    matching_rules = matching_rules.filter(age_groups__id=age_group_id)
                
                if location_id:
                    matching_rules = matching_rules.filter(locations__id=location_id)
                
                if experience_id:
                    matching_rules = matching_rules.filter(experience_levels__id=experience_id)
                
                rule = matching_rules.order_by('-priority').first()
                
                if rule:
                    recommended_course = rule.recommended_course
            
            # If still no match, get a default course
            if not recommended_course:
                recommended_course = Course.objects.filter(is_featured=True).first() or Course.objects.first()
                
                if not recommended_course:
                    return Response(
                        {"error": "No matching courses found. Please contact us for personalized recommendations."},
                        status=status.HTTP_404_NOT_FOUND
                    )
            
            # Create a minimal recommendation object to match the expected serializer format
            recommendation = {
                "name": recommended_course.title,
                "description": recommended_course.description,
                "course_details": recommended_course
            }
            
            serializer = CourseRecommendationSerializer(recommendation)
            return Response(serializer.data)
            
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )