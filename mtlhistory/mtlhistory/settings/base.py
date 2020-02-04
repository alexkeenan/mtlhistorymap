from decouple import config
import os



DB_PW = config('DB_PW')
DB_USER = config('DB_USER')
DB_NAME = config('DB_NAME')
DB_HOST = config('DB_HOST')
DB_PORT = config('DB_PORT')

DEBUG = config("DEBUG",cast=bool)
SECRET_KEY = config('SECRET_KEY')

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'frontend',
    'rest_framework',
    'accounts',
    'knox',
    'memories',
    'corsheaders',
    'storages',

]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',),
    
    # For accepting pictures through forms
    #https://stackoverflow.com/questions/28036404/django-rest-framework-upload-image-the-submitted-data-was-not-a-file
    'DEFAULT_PARSER_CLASSES': (
    'rest_framework.parsers.JSONParser',
    'rest_framework.parsers.FormParser',
    'rest_framework.parsers.MultiPartParser',
)

}

MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


CORS_ORIGIN_ALLOW_ALL = True

ROOT_URLCONF = 'mtlhistory.urls'

WSGI_APPLICATION = 'mtlhistory.wsgi.application'


TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.media',
            ],
        },
    },
]


""""""
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': DB_NAME,
        'USER': DB_USER,
        'PASSWORD': DB_PW,
        'HOST': DB_HOST,
        'PORT': DB_PORT,
    }
}




# Password validation
# https://docs.djangoproject.com/en/3.0/ref/settings/#auth-password-validators



# Internationalization
# https://docs.djangoproject.com/en/3.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.0/howto/static-files/

STATIC_URL = '/static/'

#os.path.join(BASE_DIR, "static"),

STATICFILES_DIRS = [  os.path.normpath(os.path.join(os.path.dirname(BASE_DIR), "frontend/static/"))  ] 
STATIC_ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.dirname(BASE_DIR)), "static"))
#STATICFILES_DIRS = [  os.path.normpath(os.path.join(BASE_DIR, "frontend/static/")) ] 
#STATIC_ROOT = os.path.normpath(os.path.join(BASE_DIR, "static"))

#for prod
#STATIC_URL=STATIC_ROOT

MEDIA_ROOT= os.path.join(BASE_DIR, 'media/')

#RECAPTCHA
GOOGLE_RECAPTCHA_SECRET_KEY = config('RECAPTCHA_SECRET_KEY')

