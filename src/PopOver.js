import React, { Component } from 'react';
import $ from 'jquery'

class PopOver extends Component {

    componentDidMount = () => {
//button PopOver
    //   $(document).ready(function () {
    //     $('#btnPopover').popover();
    // });

    //Mymodal fade
        $('button').click(function(){
            $('#myModal').modal('show');
            });
    }

    render() {
        return (
        // button PopOver
        // <button class="btn btn-primary" id="btnPopover" title=""
        // data-content="Edit. Delete."
        // data-toggle="popover"
        // data-trigger="">
        // Popover Example
        // </button>

// Modal fade       
<div>
<button type="button" class="btn btn-primary btn-lg">
  PopOver
</button>


<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      </div>
      <div class="modal-body">
      <div><button type="button" class="btn btn-primary">Edit</button></div>
      <hr></hr>
      <div><button type="button" class="btn btn-primary">Delete</button></div>
      </div>
    </div>
  </div>
</div>
</div>

        );
        
    }
}



export default PopOver;