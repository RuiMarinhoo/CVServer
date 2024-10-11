function photo_component(component) {
    const img_src = component.value
    let container_style = '';
    switch (component.align_value){
        case 0:
            container_style = 'justify-content: flex-start;';
            break;
        case 1:
            container_style = 'justify-content: center;';
            break;
        case 2:
            container_style = 'justify-content: flex-end;';
            break;
    }
    let img_style = component.round ? 'border-radius: 50%;' : '';

    return `<div style="display: flex; width: 100%; ${container_style}">
        <img src="${img_src}" alt="profile" style="width: 150px; height: 150px; ${img_style}">
    </div>`;
}

function text_component(component) {
    let container_style = '';
    switch (component.align_value){
        case 0:
            container_style = 'text-align: left;';
            break;
        case 1:
            container_style = 'text-align: center;';
            break;
        case 2:
            container_style = 'text-align: right;';
            break;
    }
    const title_style = component.show_title ? '' : 'display: none;';
    const text_style = component.show_title ? '' : 'font-size: 12pt; font-weight: bold; margin-top: 0.8rem; margin-bottom: 0.5rem;';
    return `<div style="display: flex; flex-direction: column; width: 100%; ${container_style}">
        <p class="title" style="${title_style}">${component.title}</p>
        <div class="text_value" style="${text_style}">${component.value}</div>
    </div>`;
}

function skills_component(component) {
    let title_style = '';
    switch (component.align_value){
        case 0:
            title_style = 'justify-content: flex-start;';
            break;
        case 1:
            title_style = 'justify-content: center;';
            break;
        case 2:
            title_style = 'justify-content: flex-end;';
            break;
    }
    let component_html = `<div style="display: flex; flex-direction: column; width: 100%;">
        <div style="display: flex; width: 100%; ${title_style}">
            <p class="title">${component.title}</p>
        </div>`;
    component.list.forEach(line => {
        let value_style = '';
        switch (line.align_value){
            case 0:
                value_style = 'justify-content: flex-start;';
                break;
            case 1:
                value_style = 'justify-content: center;';
                break;
            case 2:
                value_style = 'justify-content: flex-end;';
                break;
        }
        let value_dots_style = line.dots_value ? '' : 'display: none;';
        value_dots_style += line.break_value ? 'flex-basis: 100%;' : '';
        component_html += `<div style="display: flex; ${value_style}">
            <div style="display: flex; flex-flow: wrap; ${value_style}">
                <div class="text_value" style="margin-right: 5px;">${line.text}</div>
                <div style="display: flex; margin-top: 2px; ${value_style} ${value_dots_style}">
                    <div class="dots ${line.value >= 1 ? 'dotActive' : ''}"></div>
                    <div class="dots ${line.value >= 2 ? 'dotActive' : ''}"></div>
                    <div class="dots ${line.value >= 3 ? 'dotActive' : ''}"></div>
                    <div class="dots ${line.value >= 4 ? 'dotActive' : ''}"></div>
                    <div class="dots ${line.value >= 5 ? 'dotActive' : ''}"></div>
                </div>
            </div>
        </div>`
    })
    component_html += `</div>`;
    return component_html;
}

function topics_component(component) {
    let title_style = '';
    switch (component.align_value){
        case 0:
            title_style = 'justify-content: flex-start;';
            break;
        case 1:
            title_style = 'justify-content: center;';
            break;
        case 2:
            title_style = 'justify-content: flex-end;';
            break;
    }
    let component_html = `<div style="display: flex; flex-direction: column; width: 100%;">
        <div style="display: flex; width: 100%; ${title_style}">
            <p class="title">${component.title}</p>
        </div>`;
    component.list.forEach(line => {
        let value_style = '';
        let text_style = '';
        switch (line.align_value){
            case 0:
                value_style = 'justify-content: flex-start;';
                text_style = 'text-align: left;';
                break;
            case 1:
                value_style = 'justify-content: center;';
                text_style = 'text-align: center;';
                break;
            case 2:
                value_style = 'justify-content: flex-end;';
                text_style = 'text-align: right;';
                break;
            case 3:
                value_style = 'justify-content: space-between;';
                text_style = 'text-align: left;';
                break;
        }
        let value_dots_style = line.break_value ? 'flex-basis: 100%;' : '';
        text_style += line.dot_value ? 'display: list-item; margin-left: 15px' : '';
        component_html += `<div style="display: flex; ${value_style}">
            <div style="display: flex; flex-flow: wrap; ${value_style}">
                <div class="text_value" style="margin-right: 5px; font-weight: bold;">${line.text}</div>
                <div class="text_value" style="${value_dots_style}">${line.details}</div>
                <div class="text_value" style="${text_style}">${line.value}</div>
            </div>
        </div>`
    })
    component_html += `</div>`;
    // console.log(component_html)
    return component_html;
}

function icons_component(component) {
    let title_style = '';
    switch (component.align_value) {
        case 0:
            title_style = 'justify-content: flex-start;';
            break;
        case 1:
            title_style = 'justify-content: center;';
            break;
        case 2:
            title_style = 'justify-content: flex-end;';
            break;
    }
    let component_html = `<div style="display: flex; flex-direction: column; width: 100%;">
        <div style="display: flex; width: 100%; ${title_style}">
            <p class="title">${component.title}</p>
        </div>
        <div style="display: flex; flex-wrap: wrap; justify-content: center;">`;
    component.list.forEach(line => {
        let value_style = '';
        switch (line.align_value) {
            case 0:
                value_style = 'justify-content: flex-start;';
                break;
            case 1:
                value_style = 'justify-content: center;';
                break;
            case 2:
                value_style = 'justify-content: flex-end;';
                break;
            case 3:
                value_style = 'justify-content: space-between;';
                break;
        }
        console.log(line.break_value)
        const show_icon = line.show_icon ? '' : 'display: none';
        const show_text = line.show_text ? '' : 'display: none';
        if(line.break_value){
            component_html += `<div style="display: flex; flex-wrap: wrap; margin-right: 10px; margin-bottom: 10px; ${value_style}">
                <div style="display: flex; flex-flow: wrap; justify-content: center;">
                    <img src="http://localhost:3000/icons/${line.icon.replace('ri-', '')}.svg" alt="icon" style="width: 25px; ${show_icon}">
                    <div class="text_value" style="margin-top: 5px; flex-basis: 100%; text-align: center; ${show_text}">${line.value}</div>
                </div>
            </div>`
        } else {
            component_html += `<div style="display: flex; flex-wrap: wrap; margin-right: 10px; margin-bottom: 10px; ${value_style}">
                <div style="display: flex; flex-flow: wrap; justify-content: center; align-items: center;">
                    <img src="http://localhost:3000/icons/${line.icon.replace('ri-', '')}.svg" alt="icon" style="width: 25px; ${show_icon}">
                    <div class="text_value" style="margin-left: 5px; ${show_text}">${line.value}</div>
                </div>
            </div>`
        }
    })
    component_html += `</div></div>`;
    // console.log(component_html)
    return component_html;
}

module.exports = {
    photo_component,
    text_component,
    skills_component,
    topics_component,
    icons_component
};
