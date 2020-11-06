import { Component, OnInit, OnDestroy } from '@angular/core';
//SERVICIO
import { PersonasService } from '../../../service/personas.service';
//ROUTER
import { Router, ActivatedRoute, Params } from '@angular/router';
// MODEL
import { Persona } from '../../../model/persona.model';

@Component({
  selector: 'app-persona-details',
  templateUrl: './persona-details.component.html',
  styleUrls: ['./persona-details.component.css'],
  providers: [PersonasService],
})
export class PersonaDetailsComponent implements OnInit, OnDestroy {
  public personas: any;
  public persona: Persona;
  constructor(
    public personaService: PersonasService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    if (localStorage.getItem('personadetail') === null) {
      this._route.params.subscribe((params) => {
        const routeId = Number(params['id']);

        console.log(params['id']);
        this.personas = this.personaService.getPersonas().subscribe((res) => {
          res.map((persona) => {
            if (persona.id === routeId) {
              //console.log(persona);
              this.Persona(persona);
            }
          });
        });
      });
    } else {
      const personaLocal = JSON.parse(localStorage.getItem('personadetail'));
      this.Persona(personaLocal);
    }
  }

  ngOnInit(): void {}

  Persona(persona) {
    this.persona = persona;
    console.log(this.persona);
  }
  ngOnDestroy() {
    localStorage.removeItem('personadetail');
  }
}
