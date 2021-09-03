package com.pokemimo

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import android.widget.Toast
import com.facebook.react.bridge.ReactMethod
import com.github.dhaval2404.imagepicker.ImagePicker
import com.facebook.react.bridge.BaseActivityEventListener
import android.app.Activity
import android.net.Uri
import android.content.Intent
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import java.io.File
import android.util.Base64

class RNToastModule : ReactContextBaseJavaModule {

    private val reactContext: ReactApplicationContext
    private var callback: Callback? = null

    constructor(reactContext: ReactApplicationContext) : super(reactContext) {
        this.reactContext = reactContext
        val mActivityEventListener = object : BaseActivityEventListener() {
            override fun onActivityResult(activity: Activity?, requestCode: Int, resultCode: Int, intent: Intent) {
                if (resultCode == Activity.RESULT_OK) {
                    intent.data?.let {
                        callback?.invoke(getResponseMap(encoder(it.getPath()?:"")))
                    } ?: callback?.invoke(getErrorMap("1",null))

                } else if (resultCode == ImagePicker.RESULT_ERROR) {
                    Toast.makeText(reactContext, ImagePicker.getError(intent), Toast.LENGTH_SHORT).show()
                } else {
                    Toast.makeText(reactContext, "Task Cancelled", Toast.LENGTH_SHORT).show()
                }
            }
        }

        reactContext.addActivityEventListener(mActivityEventListener);
    }

    override fun getName() = "ImagePicker"

    override fun getConstants(): MutableMap<String, Any> {
        return hashMapOf("count" to 1)
    }

    @ReactMethod
    fun getImage(callback: Callback) {
        this.callback = callback
        getCurrentActivity()?.let { currentActivity ->

            ImagePicker.with(currentActivity)
                .crop()
                .compress(maxSize = 1024)
                .maxResultSize(width = 1080, height = 1080)
                .start()
        }
    }

    private fun encoder(filePath: String): String {
        val bytes = File(filePath).readBytes()
        return Base64.encodeToString(bytes, Base64.NO_WRAP)
    }

    fun getResponseMap( base64Image: String): ReadableMap? {
        val map: WritableMap = Arguments.createMap()
        map.putString("image", base64Image)
        return map
    }
    fun getErrorMap(errCode: String?, errMsg: String?): ReadableMap? {
        val map: WritableMap = Arguments.createMap()
        map.putString("errorCode", errCode)
        if (errMsg != null) {
            map.putString("errorMessage", errMsg)
        }
        return map
    }

}
