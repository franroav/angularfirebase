import { Injectable } from '@angular/core';

import { Ilustrations } from '../model/ilustrations.model';

@Injectable({
  providedIn: 'root',
})
export class IlustrationsService {
  // data structures
  public ilustrations: Ilustrations[] = [
    {
      id: 0,
      titulo: 'no ha iniciado sesión ✋',
      imagen: '../../assets/services/ilustrations/logged_1.png',
    },
    {
      id: 1,
      titulo: 'Software Development',
      imagen: '../../assets/services/ilustrations/software.png',
    },
    {
      id: 2,
      titulo: ' Online Store',
      imagen: '../../assets/services/ilustrations/tienda.png',
    },
    {
      id: 3,
      titulo: ' Móvil Aplication',
      imagen: '../../assets/services/ilustrations/app.png',
    },
    {
      id: 4,
      titulo: 'Web Page',
      imagen: '../../assets/services/ilustrations/web.png',
    },
    {
      id: 5,
      titulo: ' Internet Of Things ',
      imagen: '../../assets/services/ilustrations/iot.png',
    },
    {
      id: 6,
      titulo: ' Graphic Design ',
      imagen: '../../assets/services/ilustrations/diseño.png',
    },
  ];

  constructor() {}

  obtenerIlustrations() {
    return this.ilustrations;
  }
}
