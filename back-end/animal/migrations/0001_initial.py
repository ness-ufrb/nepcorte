# Generated by Django 4.2.5 on 2024-09-03 20:59

import animal.utils.species
from django.conf import settings
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Animal',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('deleted_at', models.DateTimeField(blank=True, null=True)),
                ('code', models.CharField(max_length=30)),
                ('reprodutiveSituation', models.CharField(choices=[('Macho', 'MALE'), ('Fêmea', 'FEMALE'), ('Castrado', 'CASTRATED')], max_length=10)),
                ('situation', models.CharField(choices=[('Apto para abate', 'APT_FOR_SLAUGHTER'), ('Doente ou machucado', 'SICK_OR_INJURED'), ('Animal está no lote errado', 'WRONG_BATCH')], max_length=26)),
                ('race', models.CharField(max_length=125)),
                ('age', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(2400)], verbose_name='animal age')),
                ('description', models.TextField(default='')),
                ('teeth', models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(44)])),
                ('species', models.CharField(choices=[('Bovino', 'BOVINE'), ('Caprino', 'CAPRINE'), ('Ovino', 'OVINE'), ('Suíno', 'PORCINE')], default=animal.utils.species.CustomerSpecies['BOVINE'], max_length=8)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
