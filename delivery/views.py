import json
import os
from django.core.files.base import ContentFile
from django.core.files.storage import default_storage
from django.http import HttpResponseRedirect, JsonResponse, HttpResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import time
import logging
import delivery.models as models
import delivery.login as  l
# Create your views here.
from MydeliveryProject import settings

logger = logging.getLogger('info')

def login(request):
    try:
        return render(request, 'login.html')
    except Exception as e:
        print('Exception login ---> ', e)
        return HttpResponseRedirect('/error_500/')

@csrf_exempt
def login_with_username(request):
    try:
        username = request.POST.get('username')
        password = request.POST.get('password')
        try:
            validate_user = models.Users.objects.get(u_username=username, u_password=password)
            print(validate_user)
        except models.Users.DoesNotExist:
            validate_user = None

        if validate_user is not None:
            username = validate_user.u_username
            u_id = validate_user.u_id
            print("username :", username)
            print("u_id :", u_id)
            user_role = validate_user.r_id.r_code
            print("user_role :", user_role)
            request.session['last_activity'] = str(round(time.time()))
            request.session['user_name'] = username
            request.session['u_id'] = u_id

            return JsonResponse({"result": "valid", "username": username, "user_role": user_role})
        else:
            return JsonResponse({"result": "invalid", "msg": "Invalid User credentials"})
    except Exception as e:
        print('Exception in user_login_validate --> ', e)
        return JsonResponse({"result": "error", "msg": "login error."})


def admindashboard(request):
    try:
        if 'user_name' in request.session:
            print("request.session :", request.session)
            u_id = request.session['u_id']
            print("u_id :", u_id)

            request_user_role_layout_view = 'backoffice.html'

            login_user = models.Users.objects.get(u_id=u_id)
            user_role = login_user.r_id.r_code
            print(user_role)

            if user_role == 'SK':
                request_user_role_layout_view = request_user_role_layout_view

                return render(request, 'admindashboard.html', { 'user_role':user_role, 'u_id':u_id,
                                                                         'request_user_role_layout_view': request_user_role_layout_view,


                                                                         })
            else:
                return render(request, 'admindashboard.html', {'request_user_role_layout_view': request_user_role_layout_view,
                                                                      'user_role': user_role, 'u_id': u_id,
                                                                        })
    except Exception as e:
        print('Exception admindashboard.html ---> ', e)
        return HttpResponseRedirect('/')

def additemtemplate(request):
    try:
        if 'user_name' in request.session:
            print("request.session :", request.session)
            u_id = request.session['u_id']
            print("u_id :", u_id)

            request_user_role_layout_view = 'backoffice.html'

            login_user = models.Users.objects.get(u_id=u_id)
            user_role = login_user.r_id.r_code
            print(user_role)

            if user_role == 'SK':
                request_user_role_layout_view = request_user_role_layout_view

                return render(request, 'addItem.html', { 'user_role':user_role, 'u_id':u_id,
                                                                         'request_user_role_layout_view': request_user_role_layout_view,


                                                                         })
            else:
                return render(request, 'addItem.html', {'request_user_role_layout_view': request_user_role_layout_view,
                                                                      'user_role': user_role, 'u_id': u_id,
                                                                        })
    except Exception as e:
        print('Exception addItem.html ---> ', e)
        return HttpResponseRedirect('/')



def addshop(request):
    try:
        if 'user_name' in request.session:
            print("request.session :", request.session)
            u_id = request.session['u_id']
            print("u_id :", u_id)

            request_user_role_layout_view = 'backoffice.html'

            login_user = models.Users.objects.get(u_id=u_id)
            user_role = login_user.r_id.r_code
            print(user_role)

            if user_role == 'AD':
                request_user_role_layout_view = request_user_role_layout_view

                return render(request, 'addshop.html', { 'user_role':user_role, 'u_id':u_id,
                                                                         'request_user_role_layout_view': request_user_role_layout_view,


                                                                         })
            else:
                return render(request, 'addshop.html', {'request_user_role_layout_view': request_user_role_layout_view,
                                                                      'user_role': user_role, 'u_id': u_id,
                                                                        })
    except Exception as e:
        print('Exception admindashboard ---> ', e)
        return HttpResponseRedirect('/')


@csrf_exempt
def item_list(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']

            item_list = list(
                models.ItemType.objects.values('it_id', 'it_type'))
            return JsonResponse({'result': 'success', 'item_list': item_list})
        else:
            return JsonResponse({'result': 'failed'})
    except Exception as e:
        print('Exception in item_list ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})



@csrf_exempt
def create_shop(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']

            as_id = request.POST['as_id']
            shop_name = request.POST['shop_name']
            owner_name = request.POST['owner_name']
            gst_number = request.POST['gst_number']
            item_type = request.POST['item_type']

            shop_image_flag = request.POST['shop_image_flag']

            image_file = ''

            if shop_image_flag == 'avail':
                folder = os.path.join(settings.STATIC_ROOT, 'shop_image/')
                # image_file = request.FILES['shop_image'].name
                image_file = shop_name + '.jpg'
                try:
                    os.mkdir(os.path.join(settings.STATIC_ROOT, folder))
                except:
                    pass
                full_filename = os.path.join(settings.STATIC_ROOT, folder, image_file)
                fout = open(full_filename, 'wb+')
                file_content = ContentFile(request.FILES['shop_image'].read())
                for chunk in file_content.chunks():
                    fout.write(chunk)
                fout.close()

            if as_id == '-':
                item_created = models.AddShop.objects.create(
                    u_id=models.Users.objects.get(u_id=int(u_id)),
                    it_id=models.ItemType.objects.get(it_id=int(item_type)),
                    as_name=shop_name,
                    as_owner_name=owner_name,
                    as_gst_num=gst_number,
                    as_shop_img=image_file,
                )

                return JsonResponse({'result': 'success', 'msg': 'Data Added Successfully'})
            else:
                item_updated = models.AddShop.objects.filter(as_id=as_id).update(
                    u_id=models.Users.objects.get(u_id=int(u_id)),
                    it_id=models.ItemType.objects.get(it_id=int(item_type)),
                    as_name=shop_name,
                    as_owner_name=owner_name,
                    as_gst_num=gst_number,
                    as_shop_img=image_file
                )
            return JsonResponse({'result': 'success', 'msg': 'Data Updated Successfully'})
        else:
            print('Session expaired. Please login again.')
            return JsonResponse({'result': 'failed', 'msg': 'Session expaired. Please login again.'})
    except Exception as e:
        print('Exception in create_shop ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})

def profile(request):
    try:
        if 'user_name' in request.session:
            print("request.session :", request.session)
            u_id = request.session['u_id']
            print("u_id :", u_id)

            request_user_role_layout_view = 'backoffice.html'

            login_user = models.Users.objects.get(u_id=u_id)
            user_role = login_user.r_id.r_code
            print(user_role)

            if user_role == 'SK':
                request_user_role_layout_view = request_user_role_layout_view

                return render(request, 'profile.html', { 'user_role':user_role, 'u_id':u_id,
                                                                         'request_user_role_layout_view': request_user_role_layout_view,
                                                                         })
            elif user_role == 'US':
                request_user_role_product_layout_view = "productbackoffice.html"
                return render(request, 'profile.html', {'user_role': user_role, 'u_id': u_id,
                                                        'request_user_role_product_layout_view': request_user_role_product_layout_view,
                                                        })

    except Exception as e:
        print('Exception profile ---> ', e)
        return HttpResponseRedirect('/')



@csrf_exempt
def shop_list(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']

            shop_list = list(
                models.AddShop.objects.values('as_id', 'as_name', 'as_owner_name','as_gst_num').filter(u_id=u_id))

            return JsonResponse({'result': 'success', 'shop_list': shop_list})
        else:
            return JsonResponse({'result': 'failed'})
    except Exception as e:
        print('Exception in shop_list ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})

@csrf_exempt
def user_details(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']

            user_list = list(
                models.Users.objects.values('u_id', 'u_profile_pic').filter(u_id=u_id))

            return JsonResponse({'result': 'success', 'user_list': user_list})
        else:
            return JsonResponse({'result': 'failed'})
    except Exception as e:
        print('Exception in user_details ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})

def products(request):
    try:
        if 'user_name' in request.session:
            print("request.session :", request.session)
            u_id = request.session['u_id']
            print("u_id :", u_id)

            request_user_role_product_layout_view = 'productbackoffice.html'

            login_user = models.Users.objects.get(u_id=u_id)
            user_role = login_user.r_id.r_code
            print(user_role)
            return render(request, 'products.html', { 'user_role':user_role, 'u_id':u_id,
                                                'request_user_role_product_layout_view': request_user_role_product_layout_view,
                                                                         })

    except Exception as e:
        print('Exception profile ---> ', e)
        return HttpResponseRedirect('/')

@csrf_exempt
def OrderProducts(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']
            it_id = request.POST['it_id']

            shop_list = list(
                models.AddShop.objects.values('as_id', 'as_name').filter(it_id=it_id))
            print(shop_list)

            return JsonResponse({'result': 'success', 'shop_list': shop_list})
        else:
            return JsonResponse({'result': 'failed'})
    except Exception as e:
        print('Exception in OrderProducts ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})



@csrf_exempt
def addItem(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']

            item_id = request.POST['item_id']
            shop_type = request.POST['shop_type']
            print(shop_type)
            item_name = request.POST['item_name']
            item_price = request.POST['item_price']
            item_desc = request.POST['item_desc']
            item_quantity = request.POST['item_quantity']

            item_image_flag = request.POST['item_image_flag']

            image_file = ''

            if item_image_flag == 'avail':
                folder = os.path.join(settings.STATIC_ROOT, 'item_image/')
                # image_file = request.FILES['shop_image'].name
                image_file = item_name + '.jpg'
                try:
                    os.mkdir(os.path.join(settings.STATIC_ROOT, folder))
                except:
                    pass
                full_filename = os.path.join(settings.STATIC_ROOT, folder, image_file)
                fout = open(full_filename, 'wb+')
                file_content = ContentFile(request.FILES['item_image'].read())
                for chunk in file_content.chunks():
                    fout.write(chunk)
                fout.close()

            if item_id == '-':
                item_created = models.addItem.objects.create(
                    shop_type=models.AddShop.objects.get(as_id=int(shop_type)),
                    item_name=item_name,
                    item_price=item_price,
                    item_desc=item_desc,
                    item_quantity=item_quantity,
                    item_image=image_file,
                )

                return JsonResponse({'result': 'success', 'msg': 'Data Added Successfully'})
            else:
                item_updated = models.addItem.objects.filter(item_id=item_id).update(
                    shop_type=models.AddShop.objects.get(as_id=int(shop_type)),
                    item_name=item_name,
                    item_price=item_price,
                    item_desc=item_desc,
                    item_quantity=item_quantity,
                    item_image=image_file,
                )
            return JsonResponse({'result': 'success', 'msg': 'Data Updated Successfully'})
        else:
            print('Session expaired. Please login again.')
            return JsonResponse({'result': 'failed', 'msg': 'Session expaired. Please login again.'})
    except Exception as e:
        print('Exception in addItem ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})



@csrf_exempt
def items(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']
            as_id = request.POST['as_id']

            order_item_list = list(
                models.addItem.objects.values('at_id', 'shop_type', 'item_name', 'item_price', 'item_desc').filter(shop_type=as_id))
            print(item_list)

            return JsonResponse({'result': 'success', 'order_item_list': order_item_list})
        else:
            return JsonResponse({'result': 'failed'})
    except Exception as e:
        print('Exception in items ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})

@csrf_exempt
def add_item_to_cart(request):
    try:
        if 'user_name' in request.session:
            u_id = request.session['u_id']
            at_id = request.POST['at_id']

            cart_item_list = list(
                models.addItem.objects.values('at_id', 'shop_type', 'item_name', 'item_price', 'item_desc',
                                              'shop_type__it_id__it_type').filter(at_id=at_id))
            print(cart_item_list)

            return JsonResponse({'result': 'success', 'cart_item_list': cart_item_list})
        else:
            return JsonResponse({'result': 'failed'})
    except Exception as e:
        print('Exception in add_item_to_cart ---> ', e)
        return JsonResponse({'result': 'failed', 'msg': 'Failed to do operation'})
