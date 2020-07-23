import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';

import { Lesson } from '../lesson';
import { Node } from '../node';
import { LessonService } from '../lesson.service';



interface FlatNode  {
  expandable: boolean;
  name: string;
  level: number;
}

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  private _transformer = (node: Node, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
    };
  } 
  nodes: Node[] = [];
  my_lessons:Lesson[] = [];

  treeControl = new FlatTreeControl<FlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private lessonService: LessonService) {
    // this.lessonService.getLessons().subscribe(
    //   data => {
    //     this.my_lessons = data; // after reaching to this poin, angular will render your data automaticly instead of the example data.
    //     }
    //  );
     this.lessonService.getNodes().subscribe(
       data => {
         this.nodes = data;
       }
     );
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  ngOnInit(): void {
    // this.getLessons();
    // console.log('aaaaa');
    // console.log(this.lessons);
    // this.dataSource.data = this._convert_lessons_to_flat_nodes(this.lessons);
    // this.dataSource.data = TREE_DATA;
    // console.log(this.dataSource.data);
  }
}
