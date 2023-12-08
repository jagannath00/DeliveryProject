"""Mydelivery URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.template.context_processors import static
from django.conf.urls.static import static
from django.urls import path, include
from MydeliveryProject import settings
from delivery import views
from django.contrib import admin

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.login, name='login'),
    path('admindashboard/', views.admindashboard, name='admindashboard'),
    path('products/', views.products, name='products'),
    path('profile/', views.profile, name='profile'),
    path('addshop/', views.addshop, name='addshop'),
    path('additemtemplate/', views.additemtemplate, name='additemtemplate'),
    path('login_with_username/', views.login_with_username, name='login_with_username'),
    path('item_list/', views.item_list, name='item_list'),
    path('shop_list/', views.shop_list, name='shop_list'),
    path('create_shop/', views.create_shop, name='create_shop'),
    path('user_details/', views.user_details, name='user_details'),
    path('OrderProducts/', views.OrderProducts, name='OrderProducts'),
    path('addItem/', views.addItem, name='addItem'),
    path('items/', views.items, name='items'),
    path('add_item_to_cart/', views.add_item_to_cart, name='add_item_to_cart'),

            ]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
