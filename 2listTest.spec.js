import { shallowMount } from '@vue/test-utils';
import CheckMate from '@/components/CheckMate.vue';

describe('CheckMate.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(CheckMate, {
      mocks: {
        $refs: {
          'my-modal': {
            show: jest.fn(), // Mock the show method of the modal
          },
        },
      },
    });
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(window, 'confirm').mockImplementation(() => true); // Mock confirm to always return true
  });

  afterEach(() => {
    jest.restoreAllMocks(); // Restore original implementations of mocked functions
  });

  it('should initialize with correct data', () => {
    expect(wrapper.vm.HEADER_LIST).toBeDefined();
    expect(wrapper.vm.FORM_LIST).toBeDefined();
    expect(wrapper.vm.arrayChecklist).toEqual([]);
    expect(wrapper.vm.resetkey).toBe(0);
    expect(wrapper.vm.isEmpty).toBe(false);
  });

  it('should add data to the checklist', () => {
    const details = { value: 'Test Item' };
    wrapper.vm.addDataCheck(details);
    
    expect(wrapper.vm.FORM_LIST.listName).toBe('Test Item');
  });

  it('should add a checkmate item when listName is not empty', () => {
    wrapper.vm.FORM_LIST.listName = 'Test Item';
    wrapper.vm.addCheckmate();
    
    expect(wrapper.vm.arrayChecklist.length).toBe(1);
    expect(wrapper.vm.FORM_LIST.listName).toBe('');
    expect(wrapper.vm.resetkey).toBe(1);
  });

  it('should alert invalid empty when adding a checkmate item with empty listName', () => {
    wrapper.vm.FORM_LIST.listName = '';
    
    wrapper.vm.addCheckmate();
    
    expect(window.alert).toHaveBeenCalledWith('invalid empty');
  });

  it('should clear checked items', () => {
    wrapper.vm.arrayChecklist = [
      { listName: 'Task 1', isCheck: true },
      { listName: 'Task 2', isCheck: false },
    ];
    
    wrapper.vm.clearChecked();
    
    expect(wrapper.vm.arrayChecklist.length).toBe(1); // One item should be removed
    expect(wrapper.vm.arrayChecklist[0].listName).toBe('Task 2'); // Remaining item should be Task 2
  });

  it('should alert if there are no completed items to clear', () => {
    wrapper.vm.arrayChecklist = [
      { listName: 'Task 1', isCheck: false },
      { listName: 'Task 2', isCheck: false },
    ];
    
    wrapper.vm.clearChecked();
    
    expect(window.alert).toHaveBeenCalledWith('There is no completed list.');
  });

  it('should clear all items from the checklist', () => {
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1' }, { listName: 'Task 2' }];
    
    wrapper.vm.clearAll();
    
    expect(wrapper.vm.arrayChecklist.length).toBe(0); // All items should be removed
  });

  it('should alert if there is nothing to clear', () => {
    wrapper.vm.arrayChecklist = [];
    
    wrapper.vm.clearAll();
    
    expect(window.alert).toHaveBeenCalledWith('There is nothing to be Cleared.');
  });

  it('should toggle the checked state of a checklist item', () => {
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1', isCheck: false }];
    
    wrapper.vm.toggleCheck(0);
    
    expect(wrapper.vm.arrayChecklist[0].isCheck).toBe(true); // The item should be checked now
  });

  it('should delete an item from the checklist', () => {
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1' }, { listName: 'Task 2' }];
    
    wrapper.vm.toggleDelete(0);
    
    expect(wrapper.vm.arrayChecklist.length).toBe(1); // One item should be removed
    expect(wrapper.vm.arrayChecklist[0].listName).toBe('Task 2'); // Remaining item should be Task 2
  });

  it('should not delete an item if the user cancels the confirm dialog', () => {
    window.confirm.mockImplementationOnce(() => false); // Mock confirm to return false
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1' }, { listName: 'Task 2' }];
    
    wrapper.vm.toggleDelete(0);
    
    expect (wrapper.vm.arrayChecklist.length).toBe(2); // No items should be removed
  });

  it('should show the modal window when modalWindow is called', () => {
    wrapper.vm.modalWindow();
    
    expect(wrapper.$refs['my-modal'].show).toHaveBeenCalled(); // Check if show was called
  });
});


//2nd option
import { shallowMount } from '@vue/test-utils';
import CheckMate from '@/components/CheckMate.vue';

describe('CheckMate.vue', () => {
  let wrapper;

  it('should initialize with correct data', () => {
    wrapper = shallowMount(CheckMate);
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    jest.spyOn(window, 'confirm').mockImplementation(() => true); // Mock confirm to always return true
    
    expect(wrapper.vm.HEADER_LIST).toBeDefined();
    expect(wrapper.vm.FORM_LIST).toBeDefined();
    expect(wrapper.vm.arrayChecklist).toEqual([]);
    expect(wrapper.vm.resetkey).toBe(0);
    expect(wrapper.vm.isEmpty).toBe(false);
  });

  it('should add data to the checklist', () => {
    wrapper = shallowMount(CheckMate);
    const details = { value: 'Test Item' };
    wrapper.vm.addDataCheck(details);
    
    expect(wrapper.vm.FORM_LIST.listName).toBe('Test Item');
  });

  it('should add a checkmate item when listName is not empty', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.FORM_LIST.listName = 'Test Item';
    wrapper.vm.addCheckmate();
    
    expect(wrapper.vm.arrayChecklist.length).toBe(1);
    expect(wrapper.vm.FORM_LIST.listName).toBe('');
    expect(wrapper.vm.resetkey).toBe(1);
  });

  it('should alert invalid empty when adding a checkmate item with empty listName', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.FORM_LIST.listName = '';
    wrapper.vm.addCheckmate();
    
    expect(window.alert).toHaveBeenCalledWith('invalid empty');
  });

  it('should clear checked items', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.arrayChecklist = [
      { listName: 'Task 1', isCheck: true },
      { listName: 'Task 2', isCheck: false },
    ];
    wrapper.vm.clearChecked();
    
    expect(wrapper.vm.arrayChecklist.length).toBe(1); // One item should be removed
    expect(wrapper.vm.arrayChecklist[0].listName).toBe('Task 2'); // Remaining item should be Task 2
  });

  it('should alert if there are no completed items to clear', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.arrayChecklist = [
      { listName: 'Task 1', isCheck: false },
      { listName: 'Task 2', isCheck: false },
    ];
    wrapper.vm.clearChecked();
    
    expect(window.alert).toHaveBeenCalledWith('There is no completed list.');
  });

  it('should clear all items from the checklist', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1' }, { listName: 'Task 2' }];
    wrapper.vm.clearAll();
    
    expect(wrapper.vm.arrayChecklist.length).toBe(0); // All items should be removed
  });

  it('should alert if there is nothing to clear', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.arrayChecklist = [];
    wrapper.vm.clearAll();
    
    expect(window.alert).toHaveBeenCalledWith('There is nothing to be Cleared.');
  });

  it('should toggle the checked state of a checklist item', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1', isCheck: false }];
    wrapper.vm.toggleCheck(0);
    
    expect(wrapper.vm.arrayChecklist[0].isCheck).toBe(true); // The item should be checked now
  });

  it('should delete an item from the checklist', () => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1' }, { listName: 'Task 2' }];
    wrapper.vm.toggleDelete(0);
    
    expect(wrapper.vm.arrayChecklist.length).toBe(1); // One item should be removed
    expect(wrapper.vm.arrayChecklist[0].listName).toBe('Task 2'); // Remaining item should be Task 2
  });

  it('should not delete an item if the user cancels the confirm dialog', () => {
    wrapper = shallowMount(CheckMate);
    window.confirm.mockImplementationOnce(() => false); // Mock confirm to return false
    wrapper.vm.arrayChecklist = [{ listName: 'Task 1' }, { listName: 'Task 2' }];
    wrapper.vm.toggleDelete(0);
    
    expect(wrapper.vm.arrayChecklist.length).toBe(2); // No items should be removed
  });

  it('should show the modal window when modalWindow is called', ()  => {
    wrapper = shallowMount(CheckMate);
    wrapper.vm.modalWindow();
    
    expect(wrapper.$refs['my-modal'].show).toHaveBeenCalled(); // Check if show was called
  });
});