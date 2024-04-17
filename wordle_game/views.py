from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from django.urls import reverse
from .models import Word

from .models import *


def home(request):
    return render(request, "index.html")


def rules(request):
    return render(request, "index1.html")


def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserCreationForm()
    return render(request, 'signup.html', {'form': form})


def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect(reverse('home'))
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})


from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required


@login_required
def index1(request):
    return render(request, 'index1.html')


def add_word(request):
    if request.method == 'POST':
        word = request.POST.get('word')
        if word:
            Word.objects.create(word=word)
    return redirect('home')

def remove_word(request, word_id):
    Word.objects.filter(pk=word_id).delete()
    return redirect('home')