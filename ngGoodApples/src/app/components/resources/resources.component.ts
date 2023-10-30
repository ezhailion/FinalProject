import { Component } from '@angular/core';
import { Behavior } from 'src/app/models/behavior';
import { Resource } from 'src/app/models/resource';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent {

  allResources : Resource[] = [];

  allGeneral : Resource[] = [];
  allPessimism : Resource[] = [];
  allAggression : Resource[] = [];
  allDisrespectfulness : Resource[] = [];
  allApathy : Resource[] = [];
  allImpulsivity : Resource[] = [];
  allCollaboration : Resource[] = [];
  allAccountability : Resource[] = [];
  allEmpathy : Resource[] = [];
  allIntegrity : Resource[] = [];
  allPerseverance : Resource[] = [];


  constructor(
    private resourceService : ResourceService
  ) {}

  ngOnInit() {
    this.loadAllResources();
  }



  loadAllResources() {
    this.resourceService.index().subscribe({
      next: rs => {
        this.allResources = rs.reverse();

        for (let r of this.allResources) {
          if (r.behavior?.name == 'Pessimism') {
            this.allPessimism.push(r);
          }
          else if (r.behavior?.name == 'Aggression') {
            this.allAggression.push(r);
          }
          else if (r.behavior?.name == 'Disrespectfulness') {
            this.allDisrespectfulness.push(r);
          }
          else if (r.behavior?.name == 'Pessimism') {
            this.allPessimism.push(r);
          }
          else if (r.behavior?.name == 'Apathy') {
            this.allApathy.push(r);
          }
          else if (r.behavior?.name == 'Impulsivity') {
            this.allImpulsivity.push(r);
          }
          else if (r.behavior?.name == 'Collaboration') {
            this.allCollaboration.push(r);
          }
          else if (r.behavior?.name == 'Accountability') {
            this.allAccountability.push(r);
          }
          else if (r.behavior?.name == 'Empathy') {
            this.allEmpathy.push(r);
          }
          else if (r.behavior?.name == 'Integrity') {
            this.allIntegrity.push(r);
          }
          else if (r.behavior?.name == 'Perseverance') {
            this.allPerseverance.push(r);
          } else {
            this.allGeneral.push(r);
          }

        }

      },
      error: erroneous => console.error("resources component, bad load " + erroneous)

    })
  }

  toTitle(behavior : Behavior) : string {
    return behavior ? behavior.name : "General"
  }



}
