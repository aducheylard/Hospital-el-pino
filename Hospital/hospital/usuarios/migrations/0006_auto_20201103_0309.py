# Generated by Django 3.0.7 on 2020-11-03 06:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('usuarios', '0005_remove_personal_umovil'),
    ]

    operations = [
        migrations.AddField(
            model_name='personal',
            name='apellidos',
            field=models.CharField(default='Simpson J', max_length=70),
        ),
        migrations.AddField(
            model_name='personal',
            name='nombre',
            field=models.CharField(default='Homero', max_length=30),
        ),
    ]
