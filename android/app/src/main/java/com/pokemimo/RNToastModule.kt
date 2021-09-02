package com.pokemimo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import android.widget.Toast
import com.facebook.react.bridge.ReactMethod

class RNToastModule(private val reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName() = "Toast"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    @ReactMethod
    fun show(text: String){
        Toast.makeText(reactContext, text, Toast.LENGTH_SHORT).show()
    }

}
