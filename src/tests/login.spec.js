import Login from '@/components/login/Login-Content.vue'
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";

describe("Login", () => {
    it ('Login button rendered correctly', () => {
        let wrapper = shallowMount(Login)
        expect(wrapper.find('#meta').text()).to.contain('MetaMask')
    })
});

describe("DashBoard", () => {
    it ('DashBoard rendered correctly', () => {
        let wrapper = shallowMount(Login)
        expect(wrapper.find('#chart'))
    })
});

describe("settings", () => {
    it ('settings button rendered correctly', () => {
        let wrapper = shallowMount(Login)
        expect(wrapper.find('#submit'))
    })
});

describe("Contracts", () => {
    it ('Contract page rendered correctly', () => {
        let wrapper = shallowMount(Login)
        expect(wrapper.find('#clientWallet'))
    })
});

describe("Bookkeeping", () => {
    it ('Bookkeeping page rendered correctly', () => {
        let wrapper = shallowMount(Login)
        expect(wrapper.find('#csvRender'))
    })
});