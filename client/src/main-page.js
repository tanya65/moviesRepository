import { LitElement, html, UpdatingElement } from 'lit-element';
import '../node_modules/@vaadin/vaadin-grid';
import '../node_modules/@vaadin/vaadin-button';
import '../node_modules/@polymer/paper-dialog';
import '../node_modules/@polymer/paper-input/paper-input';
import '../node_modules/@polymer/paper-input/paper-textarea';
import '../node_modules/@vaadin/vaadin-combo-box';
import '../node_modules/@vaadin/vaadin-date-picker';
import '../node_modules/@vaadin/vaadin-upload';

import { render } from '../node_modules/lit-element/node_modules/lit-html/lit-html';

export class MainPage extends LitElement {
  static get properties() {
    return {
      arr:Array,
      isActive:Boolean,
      ArrayOfActors:Array,
      listOfCast:Array,
      editId:Number,
      deletedCast:Array,
      newCast:Array,
      poster:String
    };
  }
  constructor() {
    super();
   this.arr=[];
   this.ArrayOfActors=[];
   this.listOfCast=[];
   this.next();
   this.getActors();
   this.isActive=false;
   this.editId=-1;
   this.poster='';
   this.newCast=[];
  }

  render() {
    return html`
      <style>
      vaadin-grid-cell-content{
        height:100px;
        white-space: normal;
      }
      --paper-button-ink-color: var(--paper-pink-a200);
      /* These could also be individually defined for each of the
        specific css classes, but we'll just do it once as an example */
      --paper-button-flat-keyboard-focus: {
        background-color: var(--paper-pink-a200) !important;
        color: white !important;
      };
      --paper-button-raised-keyboard-focus: {
        background-color: var(--paper-pink-a200) !important;
        color: white !important;
      };
    }
    paper-button.custom:hover {
      background-color: var(--paper-indigo-100);
    }
    paper-button.pink {
      color: var(--paper-pink-a200);

    }
    paper-button:hover{
      cursor:pointer;
    }
      
      .newActorForm[active]{
        display:block;
      }
      .newActorForm{
        display:none;
      }
      
      </style>

      <paper-dialog id="editMovie" modal style="height:auto;margin:0 0 100px 0;overflow:scroll;padding-top:0;">
      <div style="width:100%;height:40px;margin-bottom:10px;background-color:#ce659b;color:#ede2dc;text-align:center;line-height:35px;"><h2>Edit Movie Details</h2></div>
      <vaadin-upload
      nodrop
      id="posterImage"
      accept="image/*"
      form-data-name="poster"
      target="http://localhost:8081/addPoster"
      @upload-response="${(event) => {
         this.poster=event.detail.file.name;
      }}"
      >
    </vaadin-upload >
      <paper-input label="Movie Name" id="editMovieName"></paper-input>
      <paper-input label="year" char-counter maxlength="4" auto-validate allowed-pattern="[0-9]" id="editYear"></paper-input>
      <paper-textarea label="plot" id="editPlot"></paper-textarea>
      <paper-input label="cast" disabled id="editCast"></paper-input>
      <vaadin-combo-box label="add Actor" id="addMovieActors" allow-custom-value @value-changed="${this.editAddToCast}" @custom-value-set="${this.customValueSet}" .items="${this.ArrayOfActors}" item-value-path="name" item-label-path="name"></vaadin-combo-box>
      <vaadin-combo-box label="remove Actor" id="removeMovieActors" @value-changed="${this.removeFromCast}" .items="${this.listOfCast}" item-value-path="name" item-label-path="name"></vaadin-combo-box>

      <div ?active="${this.isActive}" class="newActorForm">
      
      <vaadin-combo-box label="sex" id="editActorSex" .items="${[{"sex":"male"},{"sex":"female"}]}" item-value-path="sex" item-label-path="sex"></vaadin-combo-box>
      <br>
      <vaadin-date-picker label="BirthDate" id="editDob" placeholder="Pick a date"></vaadin-date-picker>
      <paper-input label="bio" id="editActorBio"></paper-input>
      <paper-button style="margin:10px" class="custom pink" raised @click="${this.editMovieCast}">Save Actor</paper-button>
      
      </div>
      <div style="width:84%;height:30px;padding-top:10px;text-align:right;padding-right:50px;">
      <paper-button dialog-confirm style="margin:10px" @click="${this.clearValues}">Cancel</paper-button>
      <paper-button dialog-confirm style="margin:10px" autofocus @click="${this.saveEditedValues}" class="custom pink">Save</paper-button>
      </div>
      </paper-dialog>

      <paper-dialog id="modal" modal style="height:auto;overflow:scroll;margin:10px 0 100px 0;width:450px;">
      <div style="width:100%;height:40px;margin-bottom:10px;background-color:#ce659b;color:#ede2dc;text-align:center;line-height:35px;"><h2>Add Movie</h2></div>
      <vaadin-upload
       nodrop
       id="posterImage"
       accept="image/*"
       form-data-name="poster"
       target="http://localhost:8081/addPoster"
       @upload-response="${(event) => {
         console.log(event);
         console.log("done logo!");
          this.poster=event.detail.file.name;
       }}"
       >
     </vaadin-upload >
      <paper-input label="Movie Name" id="movieName"></paper-input>
      <paper-input label="year" char-counter maxlength="4" auto-validate allowed-pattern="[0-9]" id="year"></paper-input>
      <paper-textarea label="plot" id="plot"></paper-textarea>
      <paper-input label="cast" disabled id="cast"></paper-input>
      <vaadin-combo-box label="Actor" id="movieActors" allow-custom-value @value-changed="${this.addToCast}" @custom-value-set="${this.customValueSet}" .items="${this.ArrayOfActors}" item-value-path="name" item-label-path="name"></vaadin-combo-box>
      <div ?active="${this.isActive}" class="newActorForm">
      
      <vaadin-combo-box label="sex" id="actorSex" .items="${[{"sex":"male"},{"sex":"female"}]}" item-value-path="sex" item-label-path="sex"></vaadin-combo-box>
      <vaadin-date-picker label="BirthDate" id="dob" placeholder="Pick a date"></vaadin-date-picker>
      <paper-input label="bio" id="actorBio"></paper-input>
      <paper-button style="margin:10px" class="custom pink" raised @click="${this.newMovieCast}">Save Actor</paper-button>

      </div>
      <br>
      <div style="width:84%;height:30px;padding-top:10px;text-align:right;padding-right:50px;">
      <paper-button dialog-confirm @click="${this.clearValues}">Cancel</paper-button>
      <paper-button dialog-confirm style="margin:10px" autofocus @click="${this.save}" class="custom pink">Save</paper-button>
      </div>
      </paper-dialog>

      <vaadin-grid .items=${this.arr} height-by-rows theme="column-borders">
      <vaadin-grid-column .renderer=${(root, column, rowData) => this.posterRenderer(root, column, rowData)} header="Poster" width="60px"></vaadin-grid-column>
      <vaadin-grid-column path="name" header="Movie name" width="60px"></vaadin-grid-column>
      <vaadin-grid-column path="year" header="Year of Release" width="60px"></vaadin-grid-column>
      <vaadin-grid-column path="plot" header="Plot" width="100px" style='white-space:normal'></vaadin-grid-column>
      <vaadin-grid-column path="cast" header="Cast" width="60px" style='white-space:normal'></vaadin-grid-column>
      <vaadin-grid-column .renderer=${(root, column, rowData) => this.movieRenderer(root, column, rowData)} header="Edit" width="60px">
      </vaadin-grid-column>
    </vaadin-grid>
      
       <vaadin-button @click="${this.displayForm}">Add new movie</vaadin-button>
    `;
  }

  update(){
   
    super.update();

  }

  newMovieCast(){
    let name=" "+this.shadowRoot.getElementById("movieActors").value;
    let sex=this.shadowRoot.getElementById("actorSex").value;
    let dob=this.shadowRoot.getElementById("dob").value;
    let bio=this.shadowRoot.getElementById("actorBio").value;

    this.addNewCast(name,sex,dob,bio,"new");
  }
  editMovieCast(){
    let name=" "+this.shadowRoot.getElementById("addMovieActors").value;
    let sex=this.shadowRoot.getElementById("editActorSex").value;
    let dob=this.shadowRoot.getElementById("editDob").value;
    let bio=this.shadowRoot.getElementById("editActorBio").value;

    this.addNewCast(name,sex,dob,bio,"edited");
  }

addNewCast(name,sex,dob,bio,id){

  let newActor=new Object();
  newActor.name=name;
  newActor.sex=sex;
  newActor.dob=dob;
  newActor.bio=bio;

  fetch('http://localhost:8081/addActor', {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
        
    },
    redirect: 'follow', 
    referrer: 'no-referrer',
    body: JSON.stringify(newActor), 
    })
    .then(response => response.json())
    .then((resp)=>{
      let cast="";
      if(id=="new"){
        cast=this.shadowRoot.getElementById("cast").value;
      }
      else{
         cast=this.shadowRoot.getElementById("editCast").value;
      }
console.log("cast is : "+cast);
      if(cast!=""){
      cast=cast+" , ";
      }
    cast+=name;
    newActor.id=parseInt(resp.insertId);
    if(id=="new"){
      this.shadowRoot.getElementById("cast").value=cast;
    }
    else{
      this.shadowRoot.getElementById("editCast").value=cast;
    }
    
    this.listOfCast=this.listOfCast.concat([newActor]);
    this.newCast=this.newCast.concat([newActor]);
    this.ArrayOfActors=this.ArrayOfActors.concat([newActor]);
   
    this.clearValues();
    this.isActive=false;
    })


  }

  clearValues(){
  this.shadowRoot.getElementById("movieActors").value='';
  this.shadowRoot.getElementById("actorSex").value='';
  this.shadowRoot.getElementById("dob").value='';
  this.shadowRoot.getElementById("actorBio").value='';
  this.shadowRoot.getElementById("addMovieActors").value="";
  this.shadowRoot.getElementById("editActorSex").value='';
  this.shadowRoot.getElementById("editDob").value='';
  this.shadowRoot.getElementById("editActorBio").value='';

  }
  refreshForm(){
  this.shadowRoot.getElementById("movieName").value='';
  this.shadowRoot.getElementById("year").value='';
  this.shadowRoot.getElementById("cast").value='';
  this.shadowRoot.getElementById("plot").value='';
  this.shadowRoot.getElementById("movieActors").value='';
  
  }


editAddToCast(){

let actor=this.shadowRoot.getElementById("addMovieActors").selectedItem;
if(typeof(actor)!='undefined' && actor!=null){
  this.newCast=this.newCast.concat([actor]);
  console.log("=>"+this.shadowRoot.getElementById("editCast").value);
  let cast=(typeof(this.shadowRoot.getElementById("editCast").value)!='undefined')?this.shadowRoot.getElementById("editCast").value:"";
  if(cast!="" ){
    cast=cast+" , ";
  }
  cast+=actor.name;
  this.shadowRoot.getElementById("editCast").value=cast;
  this.listOfCast=this.listOfCast.concat([actor]);
  console.log(this.listOfCast);
  }
}

removeFromCast(){
  let actor=this.shadowRoot.getElementById("removeMovieActors").selectedItem;
  if(typeof(actor)!='undefined' && actor!=null){
    this.deletedCast=this.deletedCast.concat([actor]);
    let cast="";
    let index=this.listOfCast.indexOf(actor);
    if (index !== -1) this.listOfCast.splice(index, 1);
     
    for(let item of this.listOfCast){
      if(cast!=""){
        cast+=" , "+item.name;
      }
      else{
        cast+=item.name;
      }

  } 
  this.shadowRoot.getElementById("editCast").value=cast;
  this.shadowRoot.getElementById("removeMovieActors").value="";
}

}

  addToCast(){
  
    let actor=this.shadowRoot.getElementById("movieActors").selectedItem;
    if(typeof(actor)!='undefined' && actor!=null){
      let cast=this.shadowRoot.getElementById("cast").value;
      if(cast!=""){
        cast=cast+" , ";
      }
      cast+=actor.name;
      this.shadowRoot.getElementById("cast").value=cast;
      this.listOfCast=this.listOfCast.concat([actor]);
    }
    
  }

  getActors(){

    fetch('http://localhost:8081/getActors', {
      method: 'GET', 
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
      headers: {
          'Content-Type': 'application/json',
      }
      })
      .then(response => response.json())
      .then((actors)=>{
      this.ArrayOfActors=this.ArrayOfActors.concat(actors);
      })

  }

save(){

  let movie=this.shadowRoot.getElementById("movieName").value;
  let year=this.shadowRoot.getElementById("year").value;
  let plot=this.shadowRoot.getElementById("plot").value;
  let cast=this.listOfCast;
  this.addNew(movie,year,plot,cast);

}

saveEditedValues(){

  let movie=this.shadowRoot.getElementById("editMovieName").value;
  let year=this.shadowRoot.getElementById("editYear").value;
  let plot=this.shadowRoot.getElementById("editPlot").value;  
  this.updateMovie(movie,year,plot);
  this.shadowRoot.getElementById("addMovieActors").value="";

}

updateMovie(movie,year,plot){
  let newMovie=new Object();
  newMovie.name=movie;
  newMovie.year=year;
  newMovie.plot=plot;
  newMovie.newCast=this.newCast;
  newMovie.deletedCast=this.deletedCast;
  newMovie.id=this.editId;
  newMovie.poster=this.poster;
  this.poster='';

  fetch('http://localhost:8081/updateMovie', {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
        
    },
    redirect: 'follow', 
    referrer: 'no-referrer',
    body: JSON.stringify(newMovie), 
    })
    .then(response => response)
    .then((resp)=>{
      this.next();

      
    })

}

customValueSet(){

  this.isActive=true;

}


displayForm(){
  let modal=this.shadowRoot.getElementById("modal");
  this.isActive=false;
  this.listOfCast=[];
   
  modal.open();
}

addNew(movie,year,plot,cast){

  let newMovie=new Object();
  newMovie.name=movie;
  newMovie.year=year;
  newMovie.plot=plot;
  newMovie.cast=cast;
  newMovie.poster=this.poster;
  this.poster='';

  fetch('http://localhost:8081/addNew', {
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
        
    },
    redirect: 'follow', 
    referrer: 'no-referrer',
    body: JSON.stringify(newMovie), 
    })
    .then(response => response)
    .then((resp)=>{
      this.next();
    })
       
}

posterRenderer(root, column, rowData) {
   
  render(
    html`
    <img src="uploads/${rowData.item.poster}" style="width:150px;height:80px;" >
    `,
    root
  );
}

 movieRenderer(root, column, rowData) {
   
    render(
      html`
      <vaadin-button @click="${(e)=>this.edit(rowData)}">Edit details</vaadin-button>
      `,
      root
    );
  }

  next(){
    this.arr=[];
    let that=this;
    fetch('http://localhost:8081/getMovies',{
      method: 'GET',
      mode: 'cors', 
      cache: 'no-cache', 
      credentials: 'same-origin', 
     })
    .then(function(response) {
      return response.json();
    })
    .then(function(result) {
      that.arr=that.arr.concat(result);
      that.refreshForm();
    });
  }

edit(rowData){
  this.editId=rowData.item.id;
  let modal=this.shadowRoot.getElementById("editMovie");
  this.isActive=false;
  this.shadowRoot.getElementById("editMovieName").value=rowData.item.name;
  this.shadowRoot.getElementById("editYear").value=rowData.item.year;
  this.shadowRoot.getElementById("editPlot").value=rowData.item.plot
  this.shadowRoot.getElementById("editCast").value=rowData.item.cast;
  this.poster=rowData.item.poster;

  this.getListOfActors(rowData.item.id);
  this.deletedCast=[];
  this.newCast=[];
  this.isActive=false;
  modal.open();
}

getListOfActors(movieId){
  let that=this;
  let movie=new Object();
  movie.id=movieId;

  fetch('http://localhost:8081/getActorsByMovie',{
    method: 'POST',
    mode: 'cors', 
    cache: 'no-cache', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
        
    },
    redirect: 'follow', 
    referrer: 'no-referrer',
    body: JSON.stringify(movie), 
    })
  .then(function(response) {
    return response.json();
  })
  .then(function(result) {
    let size=result.length;
    that.listOfCast=new Array();
    let index=0;
    while(that.listOfCast.length<size && index<that.ArrayOfActors.length){
      for(let i=0;i<result.length;i++){
        if(that.ArrayOfActors[index].id==result[i].actor_id){
          that.listOfCast=that.listOfCast.concat([that.ArrayOfActors[index]]);
          result.splice(i,1);
          break;
        }
      } 
      
      index++;
    }
   
    });

}

}

customElements.define('main-page', MainPage);
