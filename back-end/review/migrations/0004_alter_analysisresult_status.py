# Generated by Django 4.2.5 on 2024-09-30 22:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('review', '0003_alter_analysisresult_fat_distribution_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='analysisresult',
            name='status',
            field=models.CharField(choices=[('aguardando análise', 'WAITING'), ('em análise', 'PROCESSING'), ('concluído', 'COMPLETED')], default='em análise', max_length=30),
        ),
    ]
