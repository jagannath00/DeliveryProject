# Generated by Django 3.2.15 on 2023-07-03 09:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('delivery', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='users',
            old_name='id',
            new_name='u_id',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='password',
            new_name='u_password',
        ),
        migrations.RenameField(
            model_name='users',
            old_name='username',
            new_name='u_username',
        ),
    ]