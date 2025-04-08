# backend/api/admin.py (archivo completo corregido)

from django.contrib import admin
from django.utils import timezone
from django.utils.html import format_html
from .models import (
    Location, ClassSchedule, CourseCategory, CourseSubcategory, Course,
    CourseLocation, Testimonial, FAQ, BlogCategory, BlogPost, ContactForm,
    Banner, ServiceCategory, SliderImage, SiteSettings, CourseFinderQuestion,
    CourseFinderOption, CourseRecommendationRule
)

# Location Admin
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'order', 'is_active')
    list_filter = ('state', 'city', 'is_active')
    search_fields = ('name', 'address', 'city')
    list_editable = ('order', 'is_active')

# Class Schedule Admin
class ClassScheduleInline(admin.TabularInline):
    model = ClassSchedule
    extra = 1

@admin.register(ClassSchedule)
class ClassScheduleAdmin(admin.ModelAdmin):
    list_display = ('location', 'date', 'time', 'is_full')
    list_filter = ('location', 'date', 'is_full')
    date_hierarchy = 'date'

# Course Category Admin
class CourseSubcategoryInline(admin.TabularInline):
    model = CourseSubcategory
    extra = 1
    prepopulated_fields = {'slug': ('name',)}

@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')
    list_editable = ('order', 'is_active')
    inlines = [CourseSubcategoryInline]

# Course Subcategory Admin
class CourseInline(admin.TabularInline):
    model = Course
    extra = 1
    prepopulated_fields = {'slug': ('title',)}

@admin.register(CourseSubcategory)
class CourseSubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'order', 'is_active', 'is_highlighted')
    list_filter = ('category', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    search_fields = ('name', 'description')
    list_editable = ('order', 'is_active', 'is_highlighted')
    inlines = [CourseInline]

# CourseLocation Inline for Course model
class CourseLocationInline(admin.TabularInline):
    model = CourseLocation
    extra = 1

# Course Admin
@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'subcategory', 'is_featured', 'has_free_pickup', 'is_active', 'order')
    list_filter = ('category', 'subcategory', 'is_featured', 'is_active')
    prepopulated_fields = {'slug': ('title',)}
    search_fields = ('title', 'description', 'bullet_points')
    list_editable = ('is_featured', 'has_free_pickup', 'is_active', 'order')
    inlines = [CourseLocationInline]
    fieldsets = (
        (None, {
            'fields': ('category', 'subcategory', 'title', 'slug')
        }),
        ('Content', {
            'fields': ('subtitle', 'description', 'bullet_points', 'price')
        }),
        ('Display Options', {
            'fields': ('header_color', 'is_featured', 'has_free_pickup', 'order', 'is_active')
        }),
    )

# Testimonial Admin
@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'rating', 'is_featured', 'created_at')
    list_filter = ('rating', 'is_featured')
    search_fields = ('name', 'content')
    list_editable = ('is_featured',)

# FAQ Admin
@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('question', 'category', 'order')
    list_filter = ('category',)
    search_fields = ('question', 'answer')
    list_editable = ('category', 'order')

# Blog Category Admin
@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    list_editable = ('order', 'is_active')

# Blog Post Admin
@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'published_status', 'published_date', 'is_featured')
    list_filter = ('is_published', 'is_featured', 'category', 'author')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    list_editable = ('is_featured',)
    readonly_fields = ('created_at', 'updated_at')
    
    def published_status(self, obj):
        if obj.is_published:
            return format_html('<span style="color: green;">✓</span>')
        return format_html('<span style="color: red;">✗</span>')
    
    published_status.short_description = "Published"

# Contact Form Admin
@admin.register(ContactForm)
class ContactFormAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at', 'is_processed')
    list_filter = ('is_processed', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('is_processed',)

# Banner Admin
@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    list_editable = ('order', 'is_active')

# Service Category Admin
@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'subtitle')
    list_editable = ('order', 'is_active')

# Slider Image Admin
@admin.register(SliderImage)
class SliderImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'subtitle')
    list_editable = ('order', 'is_active')

# Site Settings Admin
@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'is_active')
    
    def has_add_permission(self, request):
        # Only allow adding if no site settings exist
        return not SiteSettings.objects.exists()

# Course Finder Question Admin
class CourseFinderOptionInline(admin.TabularInline):
    model = CourseFinderOption
    extra = 1

@admin.register(CourseFinderQuestion)
class CourseFinderQuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'question_type', 'order', 'is_active')
    list_filter = ('question_type', 'is_active')
    search_fields = ('question_text',)
    list_editable = ('order', 'is_active')
    inlines = [CourseFinderOptionInline]

# Course Recommendation Rule Admin
@admin.register(CourseRecommendationRule)
class CourseRecommendationRuleAdmin(admin.ModelAdmin):
    list_display = ('name', 'recommended_course', 'priority', 'is_active')
    list_filter = ('is_active', 'recommended_course')
    search_fields = ('name', 'description')
    list_editable = ('priority', 'is_active')
    filter_horizontal = ('age_groups', 'locations', 'experience_levels')