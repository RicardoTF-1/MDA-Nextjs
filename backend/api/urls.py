# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LocationViewSet, CourseCategoryViewSet, CourseViewSet, ClassScheduleViewSet,
    TestimonialViewSet, FAQViewSet, BlogPostViewSet, ContactFormViewSet,
    BannerViewSet, ServiceCategoryViewSet
)

router = DefaultRouter()
router.register(r'locations', LocationViewSet)
router.register(r'course-categories', CourseCategoryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'class-schedules', ClassScheduleViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'blog', BlogPostViewSet)
router.register(r'contact', ContactFormViewSet, basename='contact')
router.register(r'banners', BannerViewSet, basename='banner')
router.register(r'service-categories', ServiceCategoryViewSet, basename='service-category')


urlpatterns = [
    path('', include(router.urls)),
]