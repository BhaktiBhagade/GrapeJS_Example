import loadStartType from "./if-start-type";

const AmbryPlugin = (editor, opts) => {
  // editor.Commands.add('edit-if', {
  //   run(editor, sender) {
  //     const modal = editor.Modal;
  //
  //     console.log(sender);
  //     modal.setTitle('Edit If Condition');
  //     modal.setContent(`<div>Example Modal Content</div>`);
  //     modal.open();
  //     modal.getModel().once('change:open', function () {
  //       console.log('modal opened');
  //     })
  //   }
  // });

  // dc.addType('if-condition', {
  //   isComponent: el => {
  //     console.log('in condit', el);
  //     return el.innerHTML && el.innerHTML.includes('{{#if') && el.innerHTML.includes('{{/if}}')
  //   },
  //   components: [
  //     {type: 'if-start'},
  //     {
  //       tagName: 'p',
  //       type: 'text'
  //     },
  //     {type: 'if-end'}
  //   ],
  //   // Model definition
  //   // model: {
  //   //   // Default properties
  //   //   defaults: {
  //   //     tagName: 'div',
  //   //     highlightableBoolean: true,
  //   //     editable: true,
  //   //     //draggable: 'form, form *', // Can be dropped only inside `form` elements
  //   //     droppable: true,
  //   //     traits: [
  //   //       {
  //   //         type: 'text',
  //   //         label: 'Condition',
  //   //       }
  //   //     ],
  //   //     toolbar: [
  //   //       {
  //   //         attributes: { class: 'fa fa-arrow-up' },
  //   //         command: 'edit-if'
  //   //       }
  //   //     ],
  //   //   }
  //   // }
  // });

  //
  // editor.DomComponents.addType('if-start', {
  //   isComponent: el => {
  //     console.log('el', el);
  //     if(typeof el.textContent === 'string' && el.textContent.includes('{{#if')){
  //       return { type: 'if-start'}
  //     }
  //   },
  //   model: {
  //     defaults: {
  //       tagName: 'div',
  //       editable: false,
  //       draggable: false,
  //     }
  //   }
  // });
  //
  // editor.DomComponents.addType('if-end', {
  //   isComponent: el => {
  //     console.log('in if-end', el);
  //     return typeof el.textContent === 'string' && el.textContent.includes('{{/if');
  //   },
  //   model: {
  //     defaults: {
  //       editable: false,
  //       draggable: false,
  //       droppable: false,
  //     }
  //   }
  // });

  loadStartType(editor, opts);

  editor.BlockManager.add("If Block Condition", {
    label: "If Condition",
    category: "Conditional",
    attributes: { class: "gjs-fonts gjs-f-condition-text" },
    content: `<div data-gjs-type="if-condition">
                <div data-gjs-type="if-start-type">{{#if (eq case_workflow.report_sub_type "Revised")}}</div>
                <p>Content HERE</p>
                <div data-gjs-type="if-end-type">{{/if}}</div>
             </div>`
  });
};

export default AmbryPlugin;
