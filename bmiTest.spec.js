// BmiConverter.spec.js
import { shallowMount } from "@vue/test-utils";
import BmiConverter from "./BmiConverter.vue";

describe("BmiConverter", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: {
              BmiName: "Alice",
              BmiHeight: 170,
              BmiWeight: 70,
              bmi: null,
              bmiClass: "",
            },
            personTwo: {
              BmiName: "Bob",
              BmiHeight: 180,
              BmiWeight: 80,
              bmi: null,
              bmiClass: "",
            },
          },
          CONSTANT_CONVERT: {
            constantOne: {},
            constantTwo: {},
          },
        };
      },
    });
  });

  it("should compute BMI correctly", () => {
    wrapper.vm.bmiCompute();

    expect(wrapper.vm.OUTPUT_CONVERT.personOne.bmi).toBe("24.22"); // 70 / (1.7 * 1.7)
    expect(wrapper.vm.OUTPUT_CONVERT.personTwo.bmi).toBe("24.69"); // 80 / (1.8 * 1.8)
  });

  it("should classify BMI correctly", () => {
    wrapper.vm.bmiCompute(); // Compute BMI first
    wrapper.vm.getClassification();

    expect(wrapper.vm.OUTPUT_CONVERT.personOne.bmiClass).toBe("Normal");
    expect(wrapper.vm.OUTPUT_CONVERT.personTwo.bmiClass).toBe("Normal");
  });

  it("should show alert for invalid zero or negative input", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    wrapper.setData({
      OUTPUT_CONVERT: {
        personOne: { BmiName: "Alice", BmiHeight: -170, BmiWeight: 70 },
        personTwo: { BmiName: "Bob", BmiHeight: 180, BmiWeight: 80 },
      },
    });

    wrapper.vm.getButtonAction("compute");

    expect(window.alert).toHaveBeenCalledWith("Invalid Zero or Negative Input");
    jest.restoreAllMocks();
  });

  it("should trigger alert for invalid empty input", () => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
    wrapper.setData({
      OUTPUT_CONVERT: {
        personOne: { BmiName: "", BmiHeight: 170, BmiWeight: 70 },
        personTwo: { BmiName: "Bob", BmiHeight: 180, BmiWeight: 80 },
      },
    });

    wrapper.vm.getButtonAction("compute");

    expect(window.alert).toHaveBeenCalledWith("Invalid Empty Input");
    jest.restoreAllMocks();
  });

  it("should compare BMI correctly", () => {
    wrapper.vm.bmiCompute(); // Compute BMI first
    wrapper.vm.bmiCompare();

    expect(wrapper.vm.resultBmi).toBe("Bob has greater than BMI: 24.69");
  });

  it("should add data constant correctly", () => {
    wrapper.vm.addDataConstant();

    expect(wrapper.vm.CONSTANT_CONVERT.constantOne.constantName).toBe("Alice");
    expect(wrapper.vm.CONSTANT_CONVERT.constantTwo.constantName).toBe("Bob");
  });
});

//2nd option
// BmiConverter.spec.js
import { shallowMount } from "@vue/test-utils";
import BmiConverter from "./BmiConverter.vue";

describe("BmiConverter", () => {
  it("should compute BMI correctly", () => {
    const wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: {
              BmiName: "Alice",
              BmiHeight: 170,
              BmiWeight: 70,
              bmi: null,
              bmiClass: "",
            },
            personTwo: {
              BmiName: "Bob",
              BmiHeight: 180,
              BmiWeight: 80,
              bmi: null,
              bmiClass: "",
            },
          },
        };
      },
    });

    wrapper.vm.bmiCompute();

    expect(wrapper.vm.OUTPUT_CONVERT.personOne.bmi).toBe("24.22"); // 70 / (1.7 * 1.7)
    expect(wrapper.vm.OUTPUT_CONVERT.personTwo.bmi).toBe("24.69"); // 80 / (1.8 * 1.8)
  });

  it("should classify BMI correctly", () => {
    const wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: {
              BmiName: "Alice",
              BmiHeight: 170,
              BmiWeight: 70,
              bmi: null,
              bmiClass: "",
            },
            personTwo: {
              BmiName: "Bob",
              BmiHeight: 180,
              BmiWeight: 80,
              bmi: null,
              bmiClass: "",
            },
          },
        };
      },
    });

    wrapper.vm.bmiCompute(); // Compute BMI first
    wrapper.vm.getClassification();

    expect(wrapper.vm.OUTPUT_CONVERT.personOne.bmiClass).toBe("Normal");
    expect(wrapper.vm.OUTPUT_CONVERT.personTwo.bmiClass).toBe("Normal");
  });

  it("should show alert for invalid zero or negative input", () => {
    const wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: { BmiName: "Alice", BmiHeight: -170, BmiWeight: 70 },
            personTwo: { BmiName: "Bob", BmiHeight: 180, BmiWeight: 80 },
          },
        };
      },
    });

    jest.spyOn(window, "alert").mockImplementation(() => {});
    wrapper.vm.getButtonAction("compute");

    expect(window.alert).toHaveBeenCalledWith("Invalid Zero or Negative Input");
    jest.restoreAllMocks();
  });

  it("should trigger alert for invalid empty input", () => {
    const wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: { BmiName: "", BmiHeight: 170, BmiWeight: 70 },
            personTwo: { BmiName: "Bob", BmiHeight: 180, BmiWeight: 80 },
          },
        };
      },
    });

    jest.spyOn(window, "alert").mockImplementation(() => {});
    wrapper.vm.getButtonAction("compute");

    expect(window.alert).toHaveBeenCalledWith("Invalid Empty Input");
    jest.restoreAllMocks();
  });

  it("should compare BMI correctly", () => {
    const wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: {
              BmiName: "Alice",
              BmiHeight: 170,
              BmiWeight: 70,
              bmi: null,
              bmiClass: "",
            },
            personTwo: {
              BmiName: "Bob",
              BmiHeight: 180,
              BmiWeight: 80,
              bmi: null,
              bmiClass: "",
            },
          },
        };
      },
    });

    wrapper.vm.bmiCompute(); // Compute BMI first
    wrapper.vm.bmiCompare();

    expect(wrapper.vm.resultBmi).toBe("Bob has greater than BMI: 24.69");
  });

  it("should add data constant correctly", () => {
    const wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: {
              BmiName: "Alice",
              BmiHeight: 170,
              BmiWeight: 70,
              bmi: null,
              bmiClass: "",
            },
            personTwo: {
              BmiName: "Bob",
              BmiHeight: 180,
              BmiWeight: 80,
              bmi: null,
              bmiClass: "",
            },
          },
          CONSTANT_CONVERT: {
            constantOne: {},
            constantTwo: {},
          },
        };
      },
    });

    wrapper.vm.addDataConstant();

    expect(wrapper.vm.CONSTANT_CONVERT.constantOne.constantName).toBe("Alice");
    expect(wrapper.vm.CONSTANT_CONVERT.constantTwo.constantName).toBe("Bob");
  });
});


it('should show alert for invalid character input', () => {
    const wrapper = shallowMount(BmiConverter, {
      data() {
        return {
          OUTPUT_CONVERT: {
            personOne: { BmiName: 'Alice123', BmiHeight: 170, BmiWeight: 70 },
            personTwo: { BmiName: 'Bob', BmiHeight: 180, BmiWeight: 'eighty' }
          }
        };
      }
    });
  
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    wrapper.vm.getButtonAction('compute');
  
    expect(window.alert).toHaveBeenCalledWith('Invalid Character Input');
    jest.restoreAllMocks();
  });
