import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class Configuration {

    public server = 'https://newsapi.org/v2/everything?q=';

    public apikey = '&apiKey=e5e20287e27a4c329929a275f3bde1d4';

}
