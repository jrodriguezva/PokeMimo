package com.pokemimo

import com.facebook.react.ReactActivity
import android.os.Bundle

class MainActivity : ReactActivity() {
    /**
     * Returns the name of the main component registered from JavaScript. This is used to schedule
     * rendering of the component.
     */
    override fun getMainComponentName(): String? {
        return "PokeMimo"
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(null)
    }
}
