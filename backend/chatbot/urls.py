# urls.py
from django.contrib import admin
from django.urls import path
from .views import UploadDocument, Query

urlpatterns = [
    path("admin/", admin.site.urls),
    path("upload/", UploadDocument.as_view(), name="upload-document"),
    path("query/", Query.as_view(), name="query"),
]