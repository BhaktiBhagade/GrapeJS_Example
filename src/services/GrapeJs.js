import grapesjs from "grapesjs";
import axios from "axios";
import "grapesjs-preset-newsletter";
import AmbryPlugin from "./ambry-plugin";

import "grapesjs/dist/css/grapes.min.css";
import "grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css";

const newPageComponent = (editor) => {
  editor.DomComponents.addType("new-page", {
    isComponent: (el) => {
      return el.tagName === "DIV" && el.className === "page-break-after";
    }
  });
};

//default config
export const generateConfig = (container) => ({
  // Indicate where to init the editor. You can also pass an HTMLElement
  container: container,

  // layerManager: {
  //   appendTo: '.layers-container'
  // },

  // panels: {
  //   defaults: [{
  //     id: 'layers',
  //     el: '.panel__right',
  //     // Make the panel resizable
  //     resizable: {
  //       maxDim: 350,
  //       minDim: 200,
  //       tc: 0, // Top handler
  //       cl: 1, // Left handler
  //       cr: 0, // Right handler
  //       bc: 0, // Bottom handler
  //       // Being a flex child we need to change `flex-basis` property
  //       // instead of the `width` (default)
  //       keyWidth: 'flex-basis',
  //     },
  //   }]
  // },
  //
  // blockManager: {
  //   appendTo: '#blocks',
  //   blocks: [{
  //     id: 'if_cond',
  //     label: 'If Condition',
  //     content: `<div data-gjs-type="if-condition">{{#if (eq case_workflow.report_sub_type "Revised")}}<p>Content HERE</p>{{/if}}</div>`
  //   }]
  // },

  // Get the content for the canvas directly from the element
  // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
  fromElement: true,
  // Size of the editor
  height: "800px",
  width: "auto",
  showOffsets: 1,
  styleManager: { clearProperties: 1 },
  // Avoid any default panel
  storageManager: {
    type: "remote",
    stepsBeforeSave: 10,
    urlStore: "localhost:3001",
    urlLoad: "localhost:3001",
    params: {}, // Custom parameters to pass with the remote storage request, eg. CSRF token
    headers: {} // Custom headers for the remote storage request
  },

  //components
  plugins: [AmbryPlugin, "grapesjs-preset-newsletter"],
  pluginsOpts: {
    // 'gjs-preset-webpage': {
    //   modalImportTitle: 'Import Template',
    //   modalImportLabel: '<div style="margin-bottom: 10px; font-size: 13px;">Paste here your HTML/CSS and click Import</div>',
    //   modalImportContent: function(editor) {
    //     return editor.getHtml() + '<style>'+editor.getCss()+'</style>'
    //   },
    //   filestackOpts: null, //{ key: 'AYmqZc2e8RLGLE7TGkX3Hz' },
    //   aviaryOpts: false,
    //   blocksBasicOpts: { flexGrid: 1 },
    //   customStyleManager: [{
    //     name: 'General',
    //     buildProps: ['float', 'display', 'position', 'top', 'right', 'left', 'bottom'],
    //     properties:[{
    //       name: 'Alignment',
    //       property: 'float',
    //       type: 'radio',
    //       defaults: 'none',
    //       list: [
    //         { value: 'none', className: 'fa fa-times'},
    //         { value: 'left', className: 'fa fa-align-left'},
    //         { value: 'right', className: 'fa fa-align-right'}
    //       ],
    //     },
    //       { property: 'position', type: 'select'}
    //     ],
    //   },{
    //     name: 'Dimension',
    //     open: false,
    //     buildProps: ['width', 'flex-width', 'height', 'max-width', 'min-height', 'margin', 'padding'],
    //     properties: [{
    //       id: 'flex-width',
    //       type: 'integer',
    //       name: 'Width',
    //       units: ['px', '%'],
    //       property: 'flex-basis',
    //       toRequire: 1,
    //     },{
    //       property: 'margin',
    //       properties:[
    //         { name: 'Top', property: 'margin-top'},
    //         { name: 'Right', property: 'margin-right'},
    //         { name: 'Bottom', property: 'margin-bottom'},
    //         { name: 'Left', property: 'margin-left'}
    //       ],
    //     },{
    //       property  : 'padding',
    //       properties:[
    //         { name: 'Top', property: 'padding-top'},
    //         { name: 'Right', property: 'padding-right'},
    //         { name: 'Bottom', property: 'padding-bottom'},
    //         { name: 'Left', property: 'padding-left'}
    //       ],
    //     }],
    //   },{
    //     name: 'Typography',
    //     open: false,
    //     buildProps: ['font-family', 'font-size', 'font-weight', 'letter-spacing', 'color', 'line-height', 'text-align', 'text-decoration', 'text-shadow'],
    //     properties:[
    //       { name: 'Font', property: 'font-family'},
    //       { name: 'Weight', property: 'font-weight'},
    //       { name:  'Font color', property: 'color'},
    //       {
    //         property: 'text-align',
    //         type: 'radio',
    //         defaults: 'left',
    //         list: [
    //           { value : 'left',  name : 'Left',    className: 'fa fa-align-left'},
    //           { value : 'center',  name : 'Center',  className: 'fa fa-align-center' },
    //           { value : 'right',   name : 'Right',   className: 'fa fa-align-right'},
    //           { value : 'justify', name : 'Justify',   className: 'fa fa-align-justify'}
    //         ],
    //       },{
    //         property: 'text-decoration',
    //         type: 'radio',
    //         defaults: 'none',
    //         list: [
    //           { value: 'none', name: 'None', className: 'fa fa-times'},
    //           { value: 'underline', name: 'underline', className: 'fa fa-underline' },
    //           { value: 'line-through', name: 'Line-through', className: 'fa fa-strikethrough'}
    //         ],
    //       },{
    //         property: 'text-shadow',
    //         properties: [
    //           { name: 'X position', property: 'text-shadow-h'},
    //           { name: 'Y position', property: 'text-shadow-v'},
    //           { name: 'Blur', property: 'text-shadow-blur'},
    //           { name: 'Color', property: 'text-shadow-color'}
    //         ],
    //       }],
    //   },{
    //     name: 'Decorations',
    //     open: false,
    //     buildProps: ['opacity', 'background-color', 'border-radius', 'border', 'box-shadow', 'background'],
    //     properties: [{
    //       type: 'slider',
    //       property: 'opacity',
    //       defaults: 1,
    //       step: 0.01,
    //       max: 1,
    //       min:0,
    //     },{
    //       property: 'border-radius',
    //       properties  : [
    //         { name: 'Top', property: 'border-top-left-radius'},
    //         { name: 'Right', property: 'border-top-right-radius'},
    //         { name: 'Bottom', property: 'border-bottom-left-radius'},
    //         { name: 'Left', property: 'border-bottom-right-radius'}
    //       ],
    //     },{
    //       property: 'box-shadow',
    //       properties: [
    //         { name: 'X position', property: 'box-shadow-h'},
    //         { name: 'Y position', property: 'box-shadow-v'},
    //         { name: 'Blur', property: 'box-shadow-blur'},
    //         { name: 'Spread', property: 'box-shadow-spread'},
    //         { name: 'Color', property: 'box-shadow-color'},
    //         { name: 'Shadow type', property: 'box-shadow-type'}
    //       ],
    //     },{
    //       property: 'background',
    //       properties: [
    //         { name: 'Image', property: 'background-image'},
    //         { name: 'Repeat', property:   'background-repeat'},
    //         { name: 'Position', property: 'background-position'},
    //         { name: 'Attachment', property: 'background-attachment'},
    //         { name: 'Size', property: 'background-size'}
    //       ],
    //     },],
    //   },{
    //     name: 'Extra',
    //     open: false,
    //     buildProps: ['transition', 'perspective', 'transform'],
    //     properties: [{
    //       property: 'transition',
    //       properties:[
    //         { name: 'Property', property: 'transition-property'},
    //         { name: 'Duration', property: 'transition-duration'},
    //         { name: 'Easing', property: 'transition-timing-function'}
    //       ],
    //     },{
    //       property: 'transform',
    //       properties:[
    //         { name: 'Rotate X', property: 'transform-rotate-x'},
    //         { name: 'Rotate Y', property: 'transform-rotate-y'},
    //         { name: 'Rotate Z', property: 'transform-rotate-z'},
    //         { name: 'Scale X', property: 'transform-scale-x'},
    //         { name: 'Scale Y', property: 'transform-scale-y'},
    //         { name: 'Scale Z', property: 'transform-scale-z'}
    //       ],
    //     }]
    //   },{
    //     name: 'Flex',
    //     open: false,
    //     properties: [{
    //       name: 'Flex Container',
    //       property: 'display',
    //       type: 'select',
    //       defaults: 'block',
    //       list: [
    //         { value: 'block', name: 'Disable'},
    //         { value: 'flex', name: 'Enable'}
    //       ],
    //     },{
    //       name: 'Flex Parent',
    //       property: 'label-parent-flex',
    //       type: 'integer',
    //     },{
    //       name      : 'Direction',
    //       property  : 'flex-direction',
    //       type    : 'radio',
    //       defaults  : 'row',
    //       list    : [{
    //         value   : 'row',
    //         name    : 'Row',
    //         className : 'icons-flex icon-dir-row',
    //         title   : 'Row',
    //       },{
    //         value   : 'row-reverse',
    //         name    : 'Row reverse',
    //         className : 'icons-flex icon-dir-row-rev',
    //         title   : 'Row reverse',
    //       },{
    //         value   : 'column',
    //         name    : 'Column',
    //         title   : 'Column',
    //         className : 'icons-flex icon-dir-col',
    //       },{
    //         value   : 'column-reverse',
    //         name    : 'Column reverse',
    //         title   : 'Column reverse',
    //         className : 'icons-flex icon-dir-col-rev',
    //       }],
    //     },{
    //       name      : 'Justify',
    //       property  : 'justify-content',
    //       type    : 'radio',
    //       defaults  : 'flex-start',
    //       list    : [{
    //         value   : 'flex-start',
    //         className : 'icons-flex icon-just-start',
    //         title   : 'Start',
    //       },{
    //         value   : 'flex-end',
    //         title    : 'End',
    //         className : 'icons-flex icon-just-end',
    //       },{
    //         value   : 'space-between',
    //         title    : 'Space between',
    //         className : 'icons-flex icon-just-sp-bet',
    //       },{
    //         value   : 'space-around',
    //         title    : 'Space around',
    //         className : 'icons-flex icon-just-sp-ar',
    //       },{
    //         value   : 'center',
    //         title    : 'Center',
    //         className : 'icons-flex icon-just-sp-cent',
    //       }],
    //     },{
    //       name      : 'Align',
    //       property  : 'align-items',
    //       type    : 'radio',
    //       defaults  : 'center',
    //       list    : [{
    //         value   : 'flex-start',
    //         title    : 'Start',
    //         className : 'icons-flex icon-al-start',
    //       },{
    //         value   : 'flex-end',
    //         title    : 'End',
    //         className : 'icons-flex icon-al-end',
    //       },{
    //         value   : 'stretch',
    //         title    : 'Stretch',
    //         className : 'icons-flex icon-al-str',
    //       },{
    //         value   : 'center',
    //         title    : 'Center',
    //         className : 'icons-flex icon-al-center',
    //       }],
    //     },{
    //       name: 'Flex Children',
    //       property: 'label-parent-flex',
    //       type: 'integer',
    //     },{
    //       name:     'Order',
    //       property:   'order',
    //       type:     'integer',
    //       defaults :  0,
    //       min: 0
    //     },{
    //       name    : 'Flex',
    //       property  : 'flex',
    //       type    : 'composite',
    //       properties  : [{
    //         name:     'Grow',
    //         property:   'flex-grow',
    //         type:     'integer',
    //         defaults :  0,
    //         min: 0
    //       },{
    //         name:     'Shrink',
    //         property:   'flex-shrink',
    //         type:     'integer',
    //         defaults :  0,
    //         min: 0
    //       },{
    //         name:     'Basis',
    //         property:   'flex-basis',
    //         type:     'integer',
    //         units:    ['px','%',''],
    //         unit: '',
    //         defaults :  'auto',
    //       }],
    //     },{
    //       name      : 'Align',
    //       property  : 'align-self',
    //       type      : 'radio',
    //       defaults  : 'auto',
    //       list    : [{
    //         value   : 'auto',
    //         name    : 'Auto',
    //       },{
    //         value   : 'flex-start',
    //         title    : 'Start',
    //         className : 'icons-flex icon-al-start',
    //       },{
    //         value   : 'flex-end',
    //         title    : 'End',
    //         className : 'icons-flex icon-al-end',
    //       },{
    //         value   : 'stretch',
    //         title    : 'Stretch',
    //         className : 'icons-flex icon-al-str',
    //       },{
    //         value   : 'center',
    //         title    : 'Center',
    //         className : 'icons-flex icon-al-center',
    //       }],
    //     }]
    //   }
    //   ],
    // },
    // 'gjs-preset-newsletter': {
    //   modalTitleImport: 'Import template',
    //   // ... other options
    // },
    // 'grapesjs-lory-slider': {
    //   sliderBlock: {
    //     category: 'Extra'
    //   }
    // },
    // 'grapesjs-tabs': {
    //   tabsBlock: {
    //     category: 'Extra'
    //   }
    // },
    // 'grapesjs-typed': {
    //   block: {
    //     category: 'Extra',
    //     content: {
    //       type: 'typed',
    //       'type-speed': 40,
    //       strings: [
    //         'Text row one',
    //         'Text row two',
    //         'Text row three',
    //       ],
    //     }
    //   }
    // },
  }
});

export const initializeGrapeJs = (containerRef) => {
  const config = grapeWrapper.generateConfig(containerRef.current);
  //initialization here
  const editor = grapesjs.init(config);

  const rte = editor.RichTextEditor;

  const blockManager = editor.BlockManager;

  // blockManager.add('my-first-block', {
  //   label: 'Simple block',
  //   content: '<div class="my-block">This is a simple block</div>',
  // });

  // editor.Commands.add('edit_source', {
  //   run: (editor, sender, data) => {
  //     console.log('clicked', sender, data);
  //     alert('loading!!!');
  //   },
  // });
  //
  // rte.add('source', {
  //   icon: '<b>Source</b>',
  //   attributes: { title: 'Source' },
  //   command: 'edit_source',
  //   result: rte => {
  //     editor.runCommand('edit_source');
  //   }
  // });

  editor.on("load", async function () {
    const { data } = await axios.get("/template.html");

    editor.setComponents(data);
  });

  // editor.Panels.addPanel({
  //   id: 'panel-top',
  //   el: '.panel__top',
  // });
  // editor.Panels.addPanel({
  //   id: 'basic-actions',
  //   el: '.panel__basic-actions',
  //   buttons: [
  //     {
  //       id: 'export',
  //       className: 'btn-open-export',
  //       label: 'Source',
  //       command: 'export-template',
  //       context: 'export-template', // For grouping context of buttons from the same panel
  //     }
  //   ],
  // });
};

const grapeWrapper = {
  generateConfig,
  initializeGrapeJs
};

export default grapeWrapper;
