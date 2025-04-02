from django.contrib import admin
from .models import Banner, ServiceCategory

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

