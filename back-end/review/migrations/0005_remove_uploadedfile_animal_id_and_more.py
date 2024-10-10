# Generated by Django 4.2.5 on 2024-10-08 22:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0004_alter_analysisresult_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='uploadedfile',
            name='animal_id',
        ),
        migrations.AddField(
            model_name='uploadedfile',
            name='analysis_id',
            field=models.ForeignKey(default=2, on_delete=django.db.models.deletion.CASCADE, to='review.analysisresult'),
            preserve_default=False,
        ),
    ]
