from django.contrib import admin
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
