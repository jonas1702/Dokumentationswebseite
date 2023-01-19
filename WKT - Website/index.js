import {strings} from 'constants.js';

const {AUTO_INIT_ATTR, AUTO_INIT_STATE_ATTR, INITIALIZED_STATE} = strings;

const registry = {};

const CONSOLE_WARN = console.warn.bind(console);

function wkdAutoInit(root){
	if (!root) {
		root = document;
	}
	const components = [];
	let nodes = [].slice.call(root.querySelectorAll(`[${AUTO_INIT_ATTR}]`));
	nodes = nodes.filter((node) => node.getAttribute(AUTO_INIT_STATE_ATTR) !== INITIALIZED_STATE);
	
	for (const node of nodes){
		
		const ctorName = node.getAttribute(AUTO_INIT_ATTR);
		if (!ctorName){
			throw new Error('(wkd-auto-init) Constructor must be given');
		}

		const Constructor = registry[ctorName];
		if (typeof Constructor !== 'function'){
			throw new Error(`(wkd-auto-init) Could not find constructor in registry for ${ctorName}`);
		}
		
		const component = Constructor.attachTo(node);
		Object.defineProperty(node, ctorName, {
			configurable : true,
			enumerable: false,
			value : component,
			writeable: false
		});
		components.push(component);
		node.setAttribute(AUTO_INIT_STATE_ATTR, INITIALIZED_STATE);
	}
	
	return components;
}

wkdAutoInit.register = function(componentName, Constructor, warn){
	if (!warn){
		warn = CONSOLE_WARN;
	}
	if (typeof Constructor !== 'function'){
		throw new Error(`(wkd-auto-init) Invalid Constructor value: ${Constructor}. Expacted function`);
	}
	const registryValue = registry[componentName];
	if (registryValue){
		warn(`(wkd-auto-init) Overriding registration for ${componentName} with ${Constructor}. Was: ${registryValue}`);
	}
	registry[componentName] = Constructor;
};

wkdAutoInit.deregister = function(componentName){
	delete registry[componentName];
};

wkdAutoInit.deregisterAll = function(){
	const keys = Object.keys(registry);
	keys.forEach(this.deregister, this);
}

export default wkdAutoInit;
export {wkdAutoInit};