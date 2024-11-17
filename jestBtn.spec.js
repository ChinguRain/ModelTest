// MyComponent.spec.js
import { shallowMount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MyComponent);
  });

  it('should add "responsive" class when called the first time', () => {
    // Call the method
    wrapper.vm.responsiveBtn();

    // Get the element and check its class
    const btn = document.getElementById('topHeader');
    expect(btn.className).toBe('header responsive');
  });

  it('should remove "responsive" class and revert to "header" when called the second time', () => {
    // Call the method twice
    wrapper.vm.responsiveBtn(); // First call adds "responsive"
    wrapper.vm.responsiveBtn(); // Second call removes "responsive"

    // Get the element and check its class
    const btn = document.getElementById('topHeader');
    expect(btn.className).toBe('header');
  });
});

//2nd option
// MyComponent.spec.js
import { shallowMount } from '@vue/test-utils';
import MyComponent from './MyComponent.vue';

describe('MyComponent', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(MyComponent);
  });

  it('should add "responsive" class when called the first time', () => {
    // Call the method
    wrapper.vm.responsiveBtn();

    // Check the class of the component's root element
    expect(wrapper.element.className).toContain('responsive');
  });

  it('should remove "responsive" class and revert to "header" when called the second time', () => {
    // Call the method twice
    wrapper.vm.responsiveBtn(); // First call adds "responsive"
    wrapper.vm.responsiveBtn(); // Second call removes "responsive"

    // Check the class of the component's root element
    expect(wrapper.element.className).toBe('header');
  });
});