import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  weatherInput: string;
  city : FormControl;
  checkWeather: FormGroup;
  location: string;
  weather:string;
  obj: any;

  onSubmitWeather(){


    this.http.get('/help?address='+this.checkWeather.value.weatherInput+'')
    .subscribe(res =>{
      this.obj= res;

      this.location = this.obj.location;
      this.weather = this.obj.weather;

      // console.log(this.location);

    })

    this.checkWeather.reset;
    console.log(this.weatherInput);


  }

  private fetchPosts(){

    this.http.get('http://localhost:5000/help?address=skopje')
    .subscribe(res =>{
      this.obj= res;

      this.location = this.obj.location;
      this.weather = this.obj.weather;

      console.log(this.location);

    })
  }

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {

    this.checkWeather = new FormGroup({
      weatherInput: new FormControl('')
    });

    // this.fetchPosts();
  }

}
