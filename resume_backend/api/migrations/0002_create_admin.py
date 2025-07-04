from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_superuser(apps, schema_editor):
    User = apps.get_model('your_app_name', 'YourUserModel')
    User.objects.create(
        username='admin',
        email='admin@example.com',
        password=make_password('adminpassword'),
        is_superuser=True,
        is_staff=True,
        is_active=True,
    )

class Migration(migrations.Migration):

    dependencies = [
        ('your_app_name', '0001_initial'),  # or latest migration
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]
