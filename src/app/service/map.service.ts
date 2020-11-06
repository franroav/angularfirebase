import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  public lat: number;
  public lng: number;

  constructor() {}

  getPosition() {
    // Check for Geolocation API permissions
    /*navigator.permissions.query({ name: 'geolocation' }).then(function (p) {
      console.log(p.state);
      if (p.state == 'granted') {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            this.lat = position.coords.latitude;
            this.lng = position.coords.longitude;

            return [
              { id: 0, latitude: position.coords.latitude },
              { id: 1, longitude: position.coords.longitude },
            ];
          });
        }
      }
    });*/
  }
}
