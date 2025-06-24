from django.contrib import admin
from .models import ChatMessage

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'role', 'short_message', 'timestamp']
    list_filter = ['role', 'user']
    search_fields = ['content', 'user__username']

    def short_message(self, obj):
        return (obj.content[:50] + "...") if len(obj.content) > 50 else obj.content

   
