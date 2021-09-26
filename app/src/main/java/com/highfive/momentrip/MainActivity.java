package com.highfive.momentrip;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;

import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class MainActivity extends AppCompatActivity {
    MainFragment mainFragment;
    SearchFragment searchFragment;
    AlbumFragment albumFragment;
    UserFragment userFragment;


    BottomNavigationView bottomNavigationView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //프래그먼트
        mainFragment = new MainFragment();
        searchFragment = new SearchFragment();
        albumFragment = new AlbumFragment();
        userFragment = new UserFragment();

        //네비게이션바 설정
        bottomNavigationView = (BottomNavigationView) findViewById(R.id.bottomNavigationView);
        bottomNavigationView.setBackground(null);
        bottomNavigationView.setItemIconTintList(null);
        bottomNavigationView.getMenu().getItem(2).setEnabled(false);

        bottomNavigationView.setOnNavigationItemSelectedListener(new ItemSelectedListener());
        bottomNavigationView.setSelectedItemId(R.id.tab1);  //첫 화면은 메인프래그먼트


        //플로팅 버튼(앨범, 모멘트 만들기)
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(getApplicationContext(), MakeMoment.class); //현재 액티비티와 띄우고 싶은 액티비티를 파라미터로 인텐트 정의!
                startActivity(intent);
            }
        });
    }

    //탭바 클릭 이벤트 처리 함수
    class ItemSelectedListener implements BottomNavigationView.OnNavigationItemSelectedListener {
        @Override
        public boolean onNavigationItemSelected(@NonNull MenuItem menuItem) {
            switch(menuItem.getItemId()) {
                case R.id.tab1:
                    getSupportFragmentManager().beginTransaction().replace(R.id.container, mainFragment).commit();
//                    menuItem.getIcon()="true";
//                    menu.findItem(R.id.home).setIcon(R.drawable.unselected_home_icon_24dp);
//                    menu.findItem(R.id.user).setIcon(R.drawable.unselected_user_icon_24dp);
                    break;
//
                case R.id.tab2:
                    getSupportFragmentManager().beginTransaction().replace(R.id.container, searchFragment).commit();
//                    menuItem.setIcon(R.drawable.ic_access_alarm_black_24dp);    // 선택한 이미지 변경
//                    menu.findItem(R.id.list).setIcon(R.drawable.unselected_list_icon_24dp);
//                    menu.findItem(R.id.user).setIcon(R.drawable.unselected_user_icon_24dp);
                    break;

                case R.id.tab4:
                    getSupportFragmentManager().beginTransaction().replace(R.id.container, albumFragment).commit();
//                    menuItem.setIcon(R.drawable.ic_account_balance_black_24dp);    // 선택한 이미지 변경
//                    menu.findItem(R.id.list).setIcon(R.drawable.unselected_list_icon_24dp);
//                    menu.findItem(R.id.home).setIcon(R.drawable.unselected_home_icon_24dp);
                    break;

                case R.id.tab5:
                    getSupportFragmentManager().beginTransaction().replace(R.id.container, userFragment).commit();
//                    menuItem.setIcon(R.drawable.ic_account_balance_black_24dp);    // 선택한 이미지 변경
//                    menu.findItem(R.id.list).setIcon(R.drawable.unselected_list_icon_24dp);
//                    menu.findItem(R.id.home).setIcon(R.drawable.unselected_home_icon_24dp);
//                    break;
            }
            return true;
        }
    }
}