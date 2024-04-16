package com.trendspyerapp

import android.app.Application
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.soloader.SoLoader

class MainApplication : Application(), ReactApplication {

    private val reactNativeHost = object : ReactNativeHost(this) {
        override fun getPackages(): List<ReactPackage> =
            PackageList(this).packages.apply {
                // Packages that cannot be autolinked yet can be added manually here, for example:
                // add(MyReactNativePackage())
            }

        override fun getJSMainModuleName(): String = "index"

        override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
    }

    override fun getReactNativeHost(): ReactNativeHost {
        return reactNativeHost
    }

    override fun onCreate() {
        super.onCreate()
        SoLoader.init(this, false)
        // If using the new architecture, additional setup may be required here.
    }
}
