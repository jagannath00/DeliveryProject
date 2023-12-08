from django.db import models

# Create your models here.

class Roles(models.Model):
    r_id = models.AutoField(primary_key=True)
    r_name = models.CharField(max_length=50, null=True, default=None)
    r_code = models.CharField(max_length=100, null=True, default=None)
    createdDate = models.DateTimeField(blank=True, null=True, default=None)
    updatedDate = models.DateTimeField(blank=True, null=True, default=None)

    class Meta:
        db_table = 'roles'

class Users(models.Model):
    u_id = models.AutoField(primary_key=True)
    u_username = models.CharField(unique=True, max_length=255, null=True, default=None)
    u_password = models.CharField(max_length=255, blank=True, null=True)
    u_profile_pic = models.CharField(max_length=255, blank=True, null=True)
    r_id = models.ForeignKey(Roles, on_delete=models.CASCADE)

    class Meta:
        db_table = 'users'


class ItemType(models.Model):
    it_id = models.AutoField(primary_key = True)
    it_type = models.CharField(max_length=255, blank=True, null=True)
    createdDate = models.DateTimeField(blank=True, null=True, default=None)

    class Meta:
        db_table = 'item_type'

class AddShop(models.Model):
    as_id = models.AutoField(primary_key = True)
    as_name = models.CharField(max_length=255, blank=True, null=True)
    u_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    it_id = models.ForeignKey(ItemType, on_delete=models.CASCADE)
    as_owner_name = models.CharField(max_length=255, blank=True, null=True)
    as_gst_num = models.CharField(max_length=255, blank=True, null=True)
    as_shop_img = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'add_shop'

class addItem(models.Model):
    at_id = models.AutoField(primary_key = True)
    shop_type = models.ForeignKey(AddShop, on_delete=models.CASCADE)
    item_name = models.CharField(max_length=255, blank=True, null=True)
    item_price = models.CharField(max_length=255, blank=True, null=True)
    item_desc = models.CharField(max_length=255, blank=True, null=True)
    item_quantity = models.CharField(max_length=255, blank=True, null=True)
    item_image = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'add_item'


class Orders(models.Model):
    odr_id = models.AutoField(primary_key = True)
    u_id = models.ForeignKey(Users, on_delete=models.CASCADE)
    odr_name = models.CharField(max_length=225, blank=True, null=True)
    odr_date = models.DateTimeField(auto_now_add=True)
    odr_amount = models.CharField(max_length=225, blank=True, null=True)
    odr_igst = models.CharField(max_length=225, blank=True, null=True)
    odr_cgst = models.CharField(max_length=225, blank=True, null=True)
    odr_delivery_amount = models.CharField(max_length=225, blank=True, null=True)
    odr_total_amount = models.CharField(max_length=225, blank=True, null=True)
    odr_delivery_address = models.CharField(max_length=225, blank=True, null=True)
    odr_status = models.CharField(max_length=225, blank=True, null=True)

    class Meta:
        db_table = 'orders'
