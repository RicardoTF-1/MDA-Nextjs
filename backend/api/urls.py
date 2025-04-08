# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    LocationViewSet, CourseCategoryViewSet, CourseViewSet, ClassScheduleViewSet,
    TestimonialViewSet, FAQViewSet, BlogPostViewSet, ContactFormViewSet,
    BannerViewSet, ServiceCategoryViewSet,
    TestimonialViewSet, FAQViewSet, BlogPostViewSet, ContactFormViewSet, SliderImageViewSet, LocationViewSet,
    BlogCategoryViewSet, SiteSettingsView, CourseFinderViewSet)

router = DefaultRouter()
router.register(r'locations', LocationViewSet)
router.register(r'course-categories', CourseCategoryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'class-schedules', ClassScheduleViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'faqs', FAQViewSet)
router.register(r'blog-categories', BlogCategoryViewSet)
router.register(r'blog-posts', BlogPostViewSet)
router.register(r'contact', ContactFormViewSet, basename='contact')
router.register(r'banners', BannerViewSet, basename='banner')
router.register(r'service-categories', ServiceCategoryViewSet, basename='service-category')
router.register(r'slider-images', SliderImageViewSet)
router.register(r'course-finder', CourseFinderViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('site-settings/', SiteSettingsView.as_view(), name='site-settings'),
]
