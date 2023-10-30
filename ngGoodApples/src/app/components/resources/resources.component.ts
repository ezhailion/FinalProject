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

  sections : {title : string, links : {name : string, url : string}[]}[] = [];

  constructor(
    private resourceService : ResourceService
  ) {}

  ngOnInit() {
    this.loadAllResources();
  }



  loadAllResources() {
    this.resourceService.index().subscribe({
      next: rs => {this.allResources = rs.reverse(); console.log(this.allResources)},
      error: erroneous => console.error("resources component, bad load " + erroneous)

    })
  }

  toTitle(behavior : Behavior) : string {
    return behavior ? behavior.name : "General"
  }



}
