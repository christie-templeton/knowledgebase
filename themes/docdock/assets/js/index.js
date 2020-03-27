function isObj(obj) {
  return (obj && typeof obj === 'object' && obj !== null) ? true : false;
}

function createEl(element = 'div') {
  return document.createElement(element);
}

function emptyEl(el) {
  while(el.firstChild)
  el.removeChild(el.firstChild);
}

function elem(selector, parent = document){
  let elem = isObj(parent) ? parent.querySelector(selector) : false;
  return elem ? elem : false;
}

function elems(selector, parent = document) {
  let elems = isObj(parent) ?parent.querySelectorAll(selector) : [];
  return elems.length ? elems : false;
}

function pushClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) ? false : elClass.add(targetClass);
  }
}

function deleteClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : false;
  }
}

function modifyClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    const elClass = el.classList;
    elClass.contains(targetClass) ? elClass.remove(targetClass) : elClass.add(targetClass);
  }
}

function containsClass(el, targetClass) {
  if (isObj(el) && targetClass && el !== document ) {
    return el.classList.contains(targetClass) ? true : false;
  }
}

function isChild(node, parentClass) {
  let objectsAreValid = isObj(node) && parentClass && typeof parentClass == 'string';
  return (objectsAreValid && node.closest(parentClass)) ? true : false;
}

function elemAttribute(elem, attr, value = null) {
  if (value) {
    elem.setAttribute(attr, value);
  } else {
    value = elem.getAttribute(attr);
    return value ? value : false;
  }
}

function deleteChars(str, subs) {
  let newStr = str;
  if (Array.isArray(subs)) {
    for (let i = 0; i < subs.length; i++) {
      newStr = newStr.replace(subs[i], '');
    }
  } else {
    newStr = newStr.replace(subs, '');
  }
  return newStr;
}

function isBlank(str) {
  return (!str || str.trim().length === 0);
}

function isMatch(element, selectors) {
  if(isObj(element)) {
    if(selectors.isArray) {
      let matching = selectors.map(function(selector){
        return element.matches(selector)
      })
      return matching.includes(true);
    }
    return element.matches(selectors)
  }
}

function closestInt(goal, collection) {
  const closest = collection.reduce(function(prev, curr) {
    return (Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  });
  return closest
}

function hasClasses(el) {
  if(isObj(el)) {
    const classes = el.classList;
    return classes.length
  }
}

function searchResults(results=[], order =[]) {
  let resultsFragment = new DocumentFragment();
  let showResults = elem('.search_results');
  emptyEl(showResults);
  let index = 0
  results.forEach(function(result){
    let item = createEl('a');
    item.href = result.link;
    item.className = 'search_result';
    item.textContent = result.title;
    item.style.order = order[index];
    resultsFragment.appendChild(item);
    index += 1
  });
  
  showResults.appendChild(resultsFragment);
}

function search(){
  const searchField = elem('.search_field');
  
  if (searchField) {
    searchField.addEventListener('input', function() {
      let rawResults = idx.search(`${ this.value }`).slice(0,6);
      let refs = rawResults.map(function(ref){
        // return id and score in a single string
        return `${ref.ref}:${ref.score}`;
      });
      
      let ids = refs.map(function(id){
        let positionOfSeparator = id.indexOf(":");
        id = id.substring(0,positionOfSeparator)
        return Number(id);
      });
      
      let scores = refs.map(function(score){
        let positionOfSeparator = score.indexOf(":");
        score = score.substring((positionOfSeparator + 1), (score.length - 1));
        return (parseFloat(score) * 50).toFixed(0);
      });
      
      let matchedDocuments = simpleIndex.filter(function(doc){
        return ids.includes(doc.id);
      });
      
      matchedDocuments.length >= 1 ? searchResults(matchedDocuments, scores) : false;
    });
  }
}


window.addEventListener('load', search());
