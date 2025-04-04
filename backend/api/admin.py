from django.contrib import admin
from .models import (Banner, ServiceCategory, BlogCategory, 
                     BlogPost, SiteSettings, CourseFinderQuestion, CourseFinderOption,
                     CourseRecommendationRule, Location, Course, CourseCategory)

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'description')
    list_editable = ('order', 'is_active')
    ordering = ('order', '-created_at')

@admin.register(ServiceCategory)
class ServiceCategoryAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'link', 'order', 'is_active')
    list_filter = ('is_active',)
    search_fields = ('title', 'subtitle')
    list_editable = ('order', 'is_active')
    ordering = ('order', 'title')

from .models import SliderImage, Location, ClassSchedule

# Slider Image Admin
@admin.register(SliderImage)
class SliderImageAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'is_active', 'created_at')
    list_filter = ('is_active',)
    search_fields = ('title', 'subtitle')
    ordering = ('order',)

# Class Schedule Admin
class ClassScheduleInline(admin.TabularInline):
    model = ClassSchedule
    extra = 1

@admin.register(ClassSchedule)
class ClassScheduleAdmin(admin.ModelAdmin):
    list_display = ('location', 'date', 'time', 'is_full')
    list_filter = ('location', 'date', 'is_full')
    date_hierarchy = 'date'

# Location Admin
@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'state', 'order', 'is_active')
    list_filter = ('state', 'city', 'is_active')
    search_fields = ('name', 'address', 'city')
    list_editable = ('order', 'is_active')
    inlines = [ClassScheduleInline]
    
@admin.register(BlogCategory)
class BlogCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order', 'is_active')
    prepopulated_fields = {'slug': ('name',)}
    list_filter = ('is_active',)
    search_fields = ('name', 'description')
    list_editable = ('order', 'is_active')
    ordering = ('order', 'name')

@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'author', 'published_status', 'published_date', 'is_featured', 'view_post')
    list_filter = ('is_published', 'is_featured', 'category', 'author')
    search_fields = ('title', 'excerpt', 'content')
    prepopulated_fields = {'slug': ('title',)}
    date_hierarchy = 'published_date'
    list_editable = ('is_featured',)
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'category', 'author'),
        }),
        ('Content', {
            'fields': ('excerpt', 'content', 'featured_image'),
        }),
        ('Publication', {
            'fields': ('is_published', 'published_date', 'is_featured'),
        }),
        ('SEO', {
            'fields': ('meta_description',),
            'classes': ('collapse',),
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
        }),
    )
    
    def published_status(self, obj):
        if obj.is_published:
            return format_html('<span style="color: green;">✓</span>')
        return format_html('<span style="color: red;">✗</span>')
    
    published_status.short_description = "Published"
    
    def view_post(self, obj):
        if obj.is_published:
            return format_html('<a href="/knowledge-hub/blog/{}" target="_blank">View</a>', obj.slug)
        return "Not published"
    
    view_post.short_description = "View"
    
    def save_model(self, request, obj, form, change):
        if not obj.author_id:
            obj.author = request.user
        
        if obj.is_published and not obj.published_date:
            obj.published_date = timezone.now()
            
        super().save_model(request, obj, form, change)

@admin.register(SiteSettings)
class SiteSettingsAdmin(admin.ModelAdmin):
    list_display = ('site_name', 'is_active')
    
    fieldsets = (
        ('Basic Info', {
            'fields': ('site_name', 'logo', 'logo_dark', 'favicon', 'is_active')
        }),
        ('Colors', {
            'fields': ('primary_color', 'secondary_color')
        }),
        ('Footer Info', {
            'fields': ('footer_text', 'copyright_text')
        }),
    )
    
    def has_add_permission(self, request):
        # Only allow adding if no site settings exist
        return not SiteSettings.objects.exists()

class CourseFinderOptionInline(admin.TabularInline):
    model = CourseFinderOption
    extra = 1

@admin.register(CourseFinderQuestion)
class CourseFinderQuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'question_type', 'order', 'is_active')
    list_filter = ('question_type', 'is_active')
    search_fields = ('question_text',)
    inlines = [CourseFinderOptionInline]
    list_editable = ('order', 'is_active')
    ordering = ('order',)

class RecommendationRuleAgeGroupInline(admin.TabularInline):
    model = CourseRecommendationRule.age_groups.through
    extra = 1
    verbose_name = "Age Group"
    verbose_name_plural = "Age Groups"

class RecommendationRuleLocationInline(admin.TabularInline):
    model = CourseRecommendationRule.locations.through
    extra = 1
    verbose_name = "Location"
    verbose_name_plural = "Locations"

class RecommendationRuleExperienceInline(admin.TabularInline):
    model = CourseRecommendationRule.experience_levels.through
    extra = 1
    verbose_name = "Experience Level"
    verbose_name_plural = "Experience Levels"

@admin.register(CourseRecommendationRule)
class CourseRecommendationRuleAdmin(admin.ModelAdmin):
    list_display = ('name', 'recommended_course', 'priority', 'is_active')
    list_filter = ('is_active', 'recommended_course')
    search_fields = ('name', 'description')
    exclude = ('age_groups', 'locations', 'experience_levels')
    list_editable = ('priority', 'is_active')
    inlines = [
        RecommendationRuleAgeGroupInline,
        RecommendationRuleLocationInline,
        RecommendationRuleExperienceInline
    ]
    
    
class CourseLocationInline(admin.TabularInline):
    model = Course.available_locations.through
    extra = 1
    verbose_name = "Available Location"
    verbose_name_plural = "Available Locations"

class CourseExperienceLevelInline(admin.TabularInline):
    model = Course.experience_level.through
    extra = 1
    verbose_name = "Experience Level"
    verbose_name_plural = "Experience Levels"

@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'category', 'price', 'duration', 'age_range', 'is_featured')
    list_filter = ('category', 'is_featured', 'age_range')
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    exclude = ('available_locations', 'experience_level')
    
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'category', 'description', 'bullet_points')
        }),
        ('Pricing & Duration', {
            'fields': ('price', 'discounted_price', 'duration')
        }),
        ('Display Options', {
            'fields': ('is_featured', 'image', 'age_range')
        }),
    )
    
    inlines = [
        CourseLocationInline,
        CourseExperienceLevelInline
    ]
    
@admin.register(CourseCategory)
class CourseCategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description')
    search_fields = ('name', 'slug')
    prepopulated_fields = {'slug': ('name',)}