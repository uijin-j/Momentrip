package com.highfive.momentrip;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class SignupActivity3 extends AppCompatActivity {
    private TextView celebMsg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup3);

        celebMsg = findViewById(R.id.celeb_message);

        //인텐트 받아와서 사용자 이름 + 환영 메시지
        Intent intent = getIntent();
        String str = intent.getStringExtra("name");

        celebMsg.setText(str + "님, 가입을 환영합니다!");

        Button button = findViewById(R.id.finishButton);
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                startActivity(intent);

                finish();
            }
        });

    }

}