import Login from '@/components/login/Login-Content.vue'
import { shallowMount } from "@vue/test-utils";
import { expect } from "chai";

describe("Login", () => {
    it ('Login button rendered correctly', () => {
        let wrapper = shallowMount(Login)
        expect(wrapper.find('#meta').text()).to.contain('MetaMask')
    })
});