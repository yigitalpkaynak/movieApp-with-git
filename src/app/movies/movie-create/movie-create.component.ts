import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { AlertifyService } from '../../shared/alertify.service';
import { CategoryService } from '../../category/category.service';
import { MovieService } from '../movie.service';
import { ImageValidator } from '../../validators/image.validator';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css'],
  providers: [CategoryService, MovieService]
})
export class MovieCreateComponent implements OnInit {

  categories: Category[];
  model: any = {
    categoryId: ''
  };

  constructor(private categoryService: CategoryService,
              private movieService: MovieService,
              private router: Router,
              private alertify: AlertifyService) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    })
  }

  movieForm = new UntypedFormGroup({
    title: new UntypedFormControl("", [Validators.required, Validators.minLength(5)]),
    description: new UntypedFormControl("", [Validators.required]),
    imageUrl: new UntypedFormControl("", [Validators.required, ImageValidator.isValidExtention]),
    categoryId: new UntypedFormControl("", [Validators.required])
  })

  get title(){
    return this.movieForm.get("title");
  }

  get imageUrl() {
    return this.movieForm.get("imageUrl");
  }

  clearForm() {
    this.movieForm.patchValue({
      title: '',
      description: '',
      imageUrl: '',
      categoryId: ''
    });
  }

  createMovie() {

    const movie = {
      id: 0,
      title: this.movieForm.value.title,
      description:  this.movieForm.value.description,
      imageUrl: this.movieForm.value.imageUrl,
      isPopular: false,
      datePublished: new Date().getTime(),
      categoryId: this.movieForm.value.categoryId
    };


    this.movieService.createMovie(movie).subscribe(data => {
      this.router.navigate(['/movies'])
    });

  }

  log(value: any) {
    console.log(value);
  }

}
