import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//El observable nos ayudara a recoger la respuesta del servicio rest
import { Observable } from 'rxjs';
// GLOBAL url base para servicio en local
import { GLOBAL } from './global';

import * as _ from 'lodash';

//MODELO

@Injectable({
  providedIn: 'root',
})
export class WebserviceService {
  public url: string;

  public listadoServicios: any[] = [
    {
      id: 0,
      entregable: 'software',
      servicio: 'Desarollo de Software',
      ejecutables: [
        {
          id: 0,
          name: 'Desarrollo SPA Angular + Firebase',
          frontend: '../../assets/services/ilustrations/angular.png',
          backend: '../../assets/services/ilustrations/firebase.png',
          front_id: 0,
          back_id: 0,
          description:
            'El framework de Javascript mas robusto en el mercado, recomendado para desarollo de Empresa, hecho por google.  y La base de datos de Google Firebase Real Time Database/FireStore.',
          color: 'danger',
        },
        {
          id: 1,
          name: 'Desarrollo SPA Angular + Laravel',
          frontend: '../../assets/services/ilustrations/angular.png',
          backend: '../../assets/services/ilustrations/laravel.png',
          front_id: 0,
          back_id: 1,
          description:
            'Para el Front-End, El framework de Javascript mas robusto en el mercado, recomendado para desarollo de Empresa, hecho por google. Y en el back-end el framework de Php mas popular y querido en la comunidad de desarolladores.',
          color: 'danger',
        },
        {
          id: 2,
          name: 'Desarrollo SPA Angular + NodeJs',
          frontend: '../../assets/services/ilustrations/angular.png',
          backend: '../../assets/services/ilustrations/nodejs.png',
          front_id: 0,
          back_id: 2,
          description:
            'El framework de Javascript mas robusto en el mercado, recomendado para desarollo de Empresa. Hecho por google y NodeJs framework de javascript para el back-end asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google',
          color: 'danger',
        },
        {
          id: 3,
          name: 'Desarrollo SPA Vue + Firebase',
          frontend: '../../assets/services/ilustrations/vue.png',
          backend: '../../assets/services/ilustrations/firebase.png',
          front_id: 2,
          back_id: 0,
          description:
            'El framework de javascript que trae lo mejor de React y Angular es Vue el framework desarollado por la comunidad de Javascript y patrocinado por el equipo de google, recomendado para StartUps. Hecho por google en javascript y La base de datos de Google Firebase Real Time Database/FireStore.',
          color: 'success',
        },
        {
          id: 4,
          name: 'Desarrollo SPA Vue + Laravel',
          frontend: '../../assets/services/ilustrations/vue.png',
          backend: '../../assets/services/ilustrations/laravel.png',
          front_id: 2,
          back_id: 2,
          description:
            'El framework de javascript que trae lo mejor de React y Angular es Vue el framework desarollado por la comunidad de Javascript y patrocinado por el equipo de google, recomendado para StartUps. Y en el back-end el framework de Php mas popular y querido en la comunidad de desarolladores.',
          color: 'success',
        },
        {
          id: 5,
          name: 'Desarrollo SPA Vue + NodeJs',
          frontend: '../../assets/services/ilustrations/vue.png',
          backend: '../../assets/services/ilustrations/nodejs.png',
          front_id: 2,
          back_id: 2,
          description:
            'El framework de javascript que trae lo mejor de React y Angular es Vue el framework desarollado por la comunidad de Javascript y patrocinado por el equipo de google, recomendado para StartUps. Hecho por google y NodeJs framework de javascript para el back-end asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google.',
          color: 'success',
        },
        {
          id: 6,
          name: 'Desarrollo SPA React + Firebase',
          frontend: '../../assets/services/ilustrations/react.png',
          backend: '../../assets/services/ilustrations/firebase.png',
          front_id: 2,
          back_id: 0,
          description:
            'El framework de Javascript mas utilizado actualmente en el mercado desarrollado por Facebook, recomendado para desarollo de startup o pequeña empresa o emprendimiento. Hecho por google en javascript y La base de datos de Google Firebase Real Time Database/FireStore.',
          color: 'primary',
        },
        {
          id: 7,
          name: 'Desarrollo SPA React + Laravel',
          frontend: '../../assets/services/ilustrations/react.png',
          backend: '../../assets/services/ilustrations/laravel.png',
          front_id: 2,
          back_id: 1,
          description:
            'El framework de javascript mas utilizado actualmente en el mercado desarrollado por Facebook. Y en el back-end el framework de Php mas popular y querido en la comunidad de desarolladores.',
          color: 'primary',
        },
        {
          id: 8,
          name: 'Desarrollo SPA React + NodeJs',
          frontend: '../../assets/services/ilustrations/react.png',
          backend: '../../assets/services/ilustrations/nodejs.png',
          front_id: 2,
          back_id: 2,
          description:
            'El framework de javascript mas utilizado actualmente en el mercado desarrollado por Facebook. Hecho por google y NodeJs framework de javascript para el back-end asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google.',
          color: 'primary',
        },
      ],
    },
    {
      id: 1,
      entregable: 'ecommerce',
      servicio: 'Tienda Online',
      ejecutables: [
        {
          id: 0,
          name: 'Desarrollo Web Vue + Laravel + Api Woocommerce',
          frontend: '../../assets/services/ilustrations/vue.png',
          backend: '../../assets/services/ilustrations/laravel.png',
          front_id: 2,
          back_id: 1,
          description:
            'El framework de javascript que trae lo mejor de React y Angular es Vue el framework desarollado por la comunidad de Javascript y patrocinado por el equipo de google, recomendado para StartUps. Y en el back-end el framework de Php mas popular y querido en la comunidad de desarolladores.',
          color: 'success',
        },
        {
          id: 1,
          name: 'Desarrollo Web Worpress + Woocommerce + Webpay',
          frontend: '../../assets/services/ilustrations/wordpress.png',
          backend: '../../assets/services/ilustrations/webpay.png',
          front_id: 3,
          back_id: 4,
          description:
            'Desarrollo Wordpress con maquetador de paginas Elementor y Woocommerce con WebpayPlus, recomendado como desarrollo vitrina de productos. Se recomienda desarrollar Un Front con Vue y backend laravel para proyectos que incluyan shipping, bodegas, inventarios, clientes, documentos tributarios, entre otros.',
          color: 'dark',
        },
      ],
    },
    {
      id: 2,
      entregable: 'app',
      servicio: 'Aplicación Móvil',
      ejecutables: [
        {
          id: 0,
          name: 'Desarrollo Web Wordpress + PWA',
          frontend: '../../assets/services/ilustrations/wordpress.png',
          backend: '../../assets/services/ilustrations/pwa.png',
          front_id: 4,
          back_id: 6,
          description:
            'Desarrollo Wordpress con maquetador de paginas Elementor y Plugin SuperPWA para compilar la web a dispositivo Moviles Android y Manualmente desde el Movil a Iphone para obtener el icono en el dispositivo, sin embargo es un entorno hibrido capaz para componentes basicos del dispositivo movil, no es nativo del dispositivo, se recomienda para emprendedores que requieran tener presencia en la web y dispositivos mobiles.',
          color: 'dark',
        },
        {
          id: 1,
          name: 'Desarrollo Web Ionic + PWA + SPA',
          frontend: '../../assets/services/ilustrations/pwa.png',
          backend: '../../assets/services/ilustrations/ionic.png',
          front_id: 4,
          back_id: 5,
          description:
            'El framework de javascript mas robusto en el mercado, recomendado para desarollo de Empresa. desplegar aplicación.',
          color: 'danger',
        },
      ],
    },
    {
      id: 3,
      entregable: 'web',
      servicio: 'Sitio Web SPA',
      ejecutables: [
        {
          id: 0,
          name: 'Desarrollo Web Vue',
          frontend: '../../assets/services/ilustrations/vue.png',
          backend: '../../assets/services/ilustrations/laravel.png',
          front_id: 2,
          back_id: 1,
          description:
            'El framework de javascript que trae lo mejor de React y Angular es Vue el framework desarollado por la comunidad de Javascript y patrocinado por el equipo de google, recomendado para StartUps. Y en el back-end el framework de Php mas popular y querido en la comunidad de desarolladores.',
          color: 'success',
        },
        {
          id: 1,
          name: 'Desarrollo Web React',
          frontend: '../../assets/services/ilustrations/react.png',
          backend: '../../assets/services/ilustrations/firebase.png',
          front_id: 1,
          back_id: 0,
          description:
            'El framework de javascript mas utilizado actualmente en el mercado desarrollado por Facebook y la base de datos de Google Firebase Real Time Database.',
          color: 'primary',
        },
      ],
    },
  ];

  public frontendList: any[] = [
    {
      id: 0,
      name: 'Angular js',
      url:
        'https://victorroblesweb.es/2017/08/05/que-es-angular-y-para-que-sirve/',
      title: 'Single Page Application SPA',
      description:
        'Angular es un framework para aplicaciones web desarrollado en TypeScript, de código abierto, mantenido por Google, que se utiliza para crear y mantener aplicaciones web de una sola página. Angular es un framework del Front-End o interfaz de usuario de la aplicación.',
    },
    {
      id: 1,
      name: 'React js',
      url: 'https://openwebinars.net/blog/react-native-que-es-para-que-sirve/',
      title: 'Single Page Application SPA',
      description:
        'React es una biblioteca Javascript de código abierto diseñada para crear interfaces de usuario con el objetivo de facilitar el desarrollo de aplicaciones en una sola página. Es mantenido por Facebook y la comunidad de software libre. React es un framework del Front-End o interfaz de usuario de la aplicación',
    },
    {
      id: 2,
      name: 'Vue js',
      url: 'https://lenguajejs.com/vuejs/introduccion/que-es-vue/',
      title: 'Single Page Application SPA',
      description:
        'Vue.js es un marco de JavaScript front-end modelo-vista-vista-modelo de código abierto para crear interfaces de usuario y aplicaciones de una sola página. Vue es un framework del Front-End o interfaz de usuario de la aplicación, Vue es un framework del Front-End o interfaz de usuario de la aplicación',
    },
    {
      id: 3,
      name: 'wordpress',
      url: 'https://www.webempresa.com/wordpress/que-es-wordpress.html',
      title: 'gestión de contenidos (CMS)',
      description:
        'WordPress es un sistema de gestión de contenidos (CMS) que permite crear y mantener un blog u otro tipo de web.',
    },
    {
      id: 4,
      name: 'pwa',
      url:
        'https://www.ttandem.com/blog/que-es-una-aplicacion-web-progresiva-o-pwa/',
      title: 'Aplicaciónes web Progressivas',
      description:
        'Una aplicación web progresiva es un tipo de software de aplicación que se entrega a través de la web, creado utilizando tecnologías web comunes como HTML, CSS y JavaScript. Está destinado a funcionar en cualquier plataforma que use un navegador compatible con los estándares.',
    },
  ];

  public backendList: any[] = [
    {
      id: 0,
      name: 'Firebase',
      title: 'Base de datos en tiempo real',
      url: 'https://openwebinars.net/blog/que-es-firebase-de-google/',
      description:
        'Firebase es una plataforma para el desarrollo de aplicaciones web y aplicaciones móviles desarrollada por Google.',
    },
    {
      id: 1,
      name: 'Laravel',
      title: 'framework del back-end en php',
      url:
        'https://kikopalomares.com/que-es-laravel-y-para-que-sirve-frameworks-de-php/',
      description:
        'Laravel es un framework de código abierto para desarrollar aplicaciones y servicios web con PHP 5 y PHP 7. Con el lenguaje php y la programación orientada a objetos, construimos el lenguaje del servidor.',
    },
    {
      id: 2,
      name: 'NodeJs',
      title: 'entorno en tiempo de ejecución multiplataforma',
      url: 'https://www.youtube.com/watch?v=9U8EaVjuq6U',
      description:
        'Node.js es un entorno en tiempo de ejecución multiplataforma, de código abierto, para la capa del servidor basado en el lenguaje de programación JavaScript, asíncrono, con E/S de datos en una arquitectura orientada a eventos y basado en el motor V8 de Google.',
    },
    {
      id: 3,
      name: 'wordpress',
      title: 'gestión de contenidos (CMS)',
      url: 'https://www.webempresa.com/wordpress/que-es-wordpress.html',
      description:
        'WordPress es un sistema de gestión de contenidos (CMS) que permite crear y mantener un blog u otro tipo de web.',
    },
    {
      id: 4,
      name: 'webpay',
      title: 'Servicio plataforma de Pago',
      url: 'https://www.webpay.cl/portalpagodirecto/pages/index.jsf',
      description:
        'WePay es un proveedor de servicios de pago en línea con sede en los Estados Unidos que proporciona una solución de pago integrada y personalizable a través de sus API para plataformas de negocios como sitios de crowdfunding, mercados y compañías de software para pequeñas empresas.',
    },
    {
      id: 5,
      name: 'ionic',
      title: 'SDK para el desarrollo de aplicaciones móviles híbridas',
      url: 'https://mysolutions.cl/que-es-ionic/',
      description:
        'Ionic es un SDK completo de código abierto para el desarrollo de aplicaciones móviles híbridas. Construida sobre AngularJS',
    },
    {
      id: 6,
      name: 'pwa',
      url:
        'https://www.ttandem.com/blog/que-es-una-aplicacion-web-progresiva-o-pwa/',
      title: 'Aplicaciónes web Progressivas',
      description:
        'Una aplicación web progresiva es un tipo de software de aplicación que se entrega a través de la web, creado utilizando tecnologías web comunes como HTML, CSS y JavaScript. Está destinado a funcionar en cualquier plataforma que use un navegador compatible con los estándares.',
    },
  ];

  constructor(
    private datePipe: DatePipe,
    private _formBuilder: FormBuilder,
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url;
  }

  getService() {
    return this.listadoServicios;
  }

  getFrontEnd(id: number) {
    let arrFront = [];
    for (let front of this.frontendList) {
      if (front.id === id) {
        arrFront.push(front);
      }
    }
    return arrFront;
  }

  getBackEnd(id: number) {
    let arrBack = [];
    for (let back of this.backendList) {
      if (back.id === id) {
        arrBack.push(back);
      }
    }
    return arrBack;
  }

  formulario: FormGroup = this._formBuilder.group({
    id: ['', Validators.required],
    id_user: ['', Validators.required],
    codigo: ['', Validators.required],
    certificado: ['', Validators.required],
    year: ['', Validators.required],
    codigo_ucl: ['', Validators.required],
    nombre_ucl: ['', Validators.required],
    fecha_acreditacion: ['', Validators.required],
    competencia: ['', Validators.required],
  });

  initializeFormGroup() {
    this.formulario.setValue({
      id: null,
      id_user: '',
      codigo: '',
      certificado: '',
      year: '',
      codigo_ucl: '',
      nombre_ucl: '',
      fecha_acreditacion: '',
      competencia: '',
    });
  }
  /*
    // METODO GUARDAR PROVEEDOR
    insertProveedor(proveedor): Observable<any>{
 
		let json = JSON.stringify(proveedor);
		
		let params = 'json='+json;
		
		let headers = new HttpHeaders().set('Content-Type','application/x-www-form-urlencoded');
 
    return this._http.post(this.url+'proveedor', params, {headers: headers});
    
    }
*/
  /**FIREBASE CRUD  */

  /*insertProveedor(proveedor) {
      this.proveedorList.push({
        fullName: proveedor.fullName,
        email: proveedor.email,
        mobile: proveedor.mobile,
        city: proveedor.city,
        gender: proveedor.gender,
        department: proveedor.department,
         hireDate: proveedor.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
        isPermanent: proveedor.isPermanent
      });
    }
  
    updateProveedor(proveedor) {
      this.proveedorList.update(proveedor.$key,
        {
          fullName: proveedor.fullName,
          email: proveedor.email,
          mobile: proveedor.mobile,
          city: proveedor.city,
          gender: proveedor.gender,
          department: proveedor.department,
           hireDate: proveedor.hireDate == "" ? "" : this.datePipe.transform(employee.hireDate, 'yyyy-MM-dd'),
          isPermanent: proveedor.isPermanent
        });
    }*/

  //DELETE
  deleteEmployee($key: string) {
    //this.tablaProveedor.remove($key);
  }

  populateForm(producto) {
    this.formulario.setValue(producto);
    //this.formulario.setValue(_.omit(employee,'departmentName'));
  }

  obtenerProfile(entregable: string) {
    /**/
    let arrService = [];
    for (let service of this.listadoServicios) {
      if (service.entregable == entregable) {
        arrService.push(service);
      }
    }
    return arrService;
    //return this.listadoServicios;
  }
  obtenerServiceDetails(entregable: string, id: number) {
    /**/
    const arrServiceDetail = [];
    for (const servicedetails of this.listadoServicios) {
      if (servicedetails.entregable == entregable) {
        // arrService.push(service);
        for (const detail of servicedetails.ejecutables) {
          if (detail.id === Number(id)) {
            arrServiceDetail.push(detail);
          }
        }
      }
    }
    return arrServiceDetail;
    //return this.listadoServicios;
  }

  /*getServiceDetails(entregable: string, id: number) {
   const service = obtenerServiceDetails(entregable: string, id: number);
  }*/

  /**/ obtenerProfileOcupational(codigo: number) {
    let arrProfile = [];
    /*for (let profile of this.listadoProfileOcupational) {
      let n = this.compareStrings(profile['codigo'], codigo);
      //let n = profile['codigo'].localeCompare(codigo);
      if (n == 0) {
        arrProfile.push(profile);
      }
    }*/
    return arrProfile;
  }

  /*obtenerProfileUnidadCompetencia(competencia: number) {
    let arrProfile = [];
    for (let profile of this.listadoProfileUnidadCompetencia) {
      let n = this.compareStrings(profile['codigo'], competencia);
      //let n = profile['codigo'].localeCompare(codigo);
      if (n == 0) {
        arrProfile.push(profile);
      }
    }
    return arrProfile;
  }*/

  compareStrings(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}
