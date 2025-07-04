from django.db import migrations
from django.contrib.auth.hashers import make_password

def create_superuser(apps, schema_editor):
    User = apps.get_model('api', 'User')
    User.objects.create(
        username='admin',
        email='gopalsravani66@gmail.com',
        password=make_password('adminpassword'),
        is_superuser=True,
        is_staff=True,
        is_active=True,
    )

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),  # or latest migration
    ]

    operations = [
        migrations.RunPython(create_superuser),
    ]
